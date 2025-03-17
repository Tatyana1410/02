import React from 'react';
import { useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function Basket({selectedProduct, remove, clearCart, decreaseQuantity, selectProd}) {
    const navigate = useNavigate();
    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);;
        };
    const totalPrice = selectedProduct.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return (
        <>
        <div className='container'>
            <h2>Basket</h2>
        
        {selectedProduct.length ?
            <div className="container">
                    {selectedProduct.map((product, index)=>{
                        return <div key={index} className='d-flex product-favorite border-bottom border-top py-2 border-2 align-items-center justify-content-between'>
                                    <div className='col-3'>
                                        <img src={product.images[0]} 
                                        alt={product.title} 
                                        style={{width:'75%',
                                            cursor:'pointer'
                                        }}
                                        onClick={() => handleProductClick(product.id)}/>
                                    </div>
                                    <div className='col-4'>
                                        <h5 className='mb-3'
                                        style={{cursor:'pointer'}} 
                                        onClick={() => handleProductClick(product.id)}>
                                            {product.title}</h5>
                                        <h4 className='price'>{product.price} $</h4>
                                    </div>
                                    <div className='d-flex col-2 justify-content-evenly align-items-center'>
                                        <button className='btn' onClick={() => decreaseQuantity(product.id)}><h4>-</h4></button>
                                        <h4>{product.quantity} </h4>
                                        <button className='btn' onClick={() => selectProd(product)}><h4>+</h4></button>
                                    
                                    </div>
                                    <div className='col-3 text-center'>
                                        <button className="btn" onClick={()=>remove(index)}><FontAwesomeIcon icon={faTrashCan} className='icon'/></button>
                                    </div>
                                </div>
                    })}
                <div className='container p-3 text-end'>
                    <h4>Total Price: <span className='price'>{totalPrice} $</span></h4>
                </div>
                <div className='d-flex justify-content-between'>
                    <button className='btn btn-secondary px-lg-5 fs-6' onClick={clearCart}>Clear basket</button>
                    <button className='btn btn-secondary px-lg-5 fs-6' onClick={() => navigate('/checkout')}>Checkout</button>
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