import React, {useEffect, useState,useContext} from 'react';
import { ProductContext } from '../context/ProductContext';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

function Product() {
    const {
        selectFavorite,
        selectProd
      } = useContext(ProductContext);
    const {id} =useParams()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image, setImage]=useState();
       
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error('Error loading products:', err);
                setError(err.message || 'Failed to load new product categories.');
            } finally {
                setLoading(false);
          }
          };
      
          fetchProducts();
        }, [id]);

        useEffect(()=>{
            if (!products.images || products.images.length === 0) return;
            setImage(products.images[0]);
        }, [products.images])

    if (loading) return <p>Loading products...</p>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!products) return <p>Product not found</p>;
        
    return (
        <>
        <div className="container position-relative">
            <div className="d-md-flex d-block gap-3 " >
                <div className="d-flex align-items-start col-12 col-md-6 mb-3 mb-md-0">
            {/* big image */}
                    <div className='main-image'>
                        <img src={image} alt="Product"
                        style={{width:'100%',
                            height:'auto',
                            objectFit:'cover'
                        }}/>
                    </div>
            {/* small image */}
                    <div className= 'd-block justify-content-center'>
                        {products.images.map((img, index) => (
                            <div
                                key={index}
                                className={`thumbnail ${image === img ? 'active' : ''} mb-1`}
                                onClick={() => setImage(img)}
                            >
                                <img src={img} 
                                alt={`thumbnail ${index + 1}`}
                                style={{width:'100%',
                                    height:'auto',
                                    objectFit:'cover'
                                }}
                                />
                            </div>
                        ))}
                    </div>
                 </div>
                    
                <div className="col-12 col-md-6">
                    <h4 key= {`${products.title}_${products.id}`} 
                                style={{minHeight:'45px'}}>{products.title}</h4>
                    <p>{products.description}</p>
                    <div className='d-flex justify-content-between mt-3'>
                            <h4 key= {products.id} className="price">{products.price} $</h4> 
                        <div>
                            <button type="button" className="btn me-2" onClick={()=>selectFavorite(products)}>
                                        <FontAwesomeIcon icon={faHeart} className='icon'/>
                                    </button>
                            <button type="button" className="btn" onClick={()=>selectProd(products)}><FontAwesomeIcon icon={faBasketShopping} className='icon'/>
                                    </button>
                        </div>
                    </div>
                </div>
            </div>    
        </div>  
    </>
       
    );
}

export default Product;