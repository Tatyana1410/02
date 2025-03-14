import React from 'react';
import { useNavigate } from 'react-router-dom';



function Basket({selectedProduct, remove, clearCart}) {
    const navigate = useNavigate();
    
    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);;
        };
    
    const totalPrice = selectedProduct.reduce((acc, product) => {
        const price = product.price || 0;
        return acc + price;
      }, 0);

    return (
        <>
        <div className='container'>
            <h2>Basket</h2>
        
        {selectedProduct.length ?
            <div className="container">
                    {selectedProduct.map((product, index)=>{
                        return <div key={index} className='d-flex border-bottom border-top py-2 border-2 align-items-center justify-content-between'>
                                    <div className='col-3'>
                                        <img src={product.category.image} 
                                        alt={product.title} 
                                        style={{width:'100%'}}
                                        onClick={() => handleProductClick(product.id)}/>
                                    </div>
                                    <div className='col-3'>
                                        <h5 className='mb-3' 
                                        onClick={() => handleProductClick(product.id)}>
                                            {product.title}</h5>
                                        <h4>{product.price} $</h4>
                                    </div>
                                    <div>
                                        <button className="btn btn-secondary px-lg-5 fs-5" onClick={()=>remove(index)}>Delete</button>
                                    </div>
                                    
                                </div>
                    })}
                <div className='container p-3 text-end'>
                    <h4>Total Price: {totalPrice} $</h4>
                </div>
                <div className='d-flex justify-content-between'>
                    <button className='btn btn-secondary px-lg-5 fs-5' onClick={clearCart}>Clear basket</button>
                    <button className='btn btn-secondary px-lg-5 fs-5' onClick={() => navigate('/checkout')}>Checkout</button>
                </div>
            </div>
            :
            <div className='container my-5'>
                <p className='text-center align-middle'>Basket is empty</p>
            </div>
            }

</div>
            
        </>
    );
}

export default Basket;