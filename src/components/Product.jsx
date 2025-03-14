import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

function Product({selectProd,selectFavorite}) {
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

        // useEffect(()=>{
        //     if (!products.images || products.images.length === 0) return;
        //     setImage(products.images[0]);
        // }, [products.images])

    if (loading) return <p>Loading products...</p>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!products) return <p>Product not found</p>;
        

        
    return (
        <>
            <div className="card m-2 p-2" style={{width:'20rem'}}>
                    <div>
                        <div>
                                {products.category && products.category.image && (
                            <img 
                                src={products.category.image} 
                                className="img-fluid rounded-start" 
                                alt={products.title} 
                                style={{height: '100%', objectFit: 'cover'}}
                                // onClick={()=>setIsSubmit(false)}
                            />
                        )}
                        </div> 

                        {/* <div style={{backgroundImage:`url(${image})` }}/>
                            <div>
                            {products.images.map((image, i) => (
                        <div
                            key={i}
                            onClick={() => setImage(image)} 
                            style={{backgroundImage:`url(${image})`}}/> ))}
                
                            </div> */}
                    
                        <div className="card-body">
                            <h5 key= {`${products.title}_${products.id}`} 
                                className="card-title"
                                style={{minHeight:'45px'}}>{products.title}</h5>
                            <p>{products.description}</p>
                            <div className='d-flex justify-content-between mt-3'>
                                <h4 key= {products.id} className="card-title">{products.price} $</h4> 
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