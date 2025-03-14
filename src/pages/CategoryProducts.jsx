import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Product from '../components/Product';
import { useNavigate } from 'react-router-dom';

const CategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);;
    };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        // За умови, що API підтримує фільтрацію через query-параметр categoryId
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${id}`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error loading products:', err);
        setError(err.message ||'Failed to load new product categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [id]);

  if (loading) {return <p>Loading products...</p>;}
  if (error) {return <div className="alert alert-danger">{error}</div>;}

 
  return (
    <>
    <div className="container" >
        <div className='row justify-content-between'>
      <h2 key={products.id}>
        {products.length>0 ? products[0].category.name:'Category'}
        </h2>
        {products.map((product) => (
            <div key={product.id} className="card m-2 p-2" style={{width:'20rem'}}>
                <div>
                    <img 
                    src={product.category.image} 
                    className="card-img-top" 
                    alt={product.title}
                    style={{width:'100%',
                    height:'18rem'
                    }}
                    onClick={() => handleProductClick(product.id)}/>
                </div>
            
                <div className="card-body">
                    <h5 className="card-title"
                        style={{minHeight:'45px'}}>{product.title}</h5>
                    <div className='d-flex justify-content-between mt-3'>
                        <h4 className="card-title">{product.price} $</h4> 
                    </div>
                </div>
            </div>
        ))}

        </div>
     </div>

     </> 


  );
};

export default CategoryProducts;