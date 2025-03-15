import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


function ProductCard({title, id, category, price, selectProd, selectFavorite}) {

        const navigate = useNavigate();

        const handleProductClick = (id) => {
          navigate(`/products/${id}`);
        };

   
    return (
      <>
     
        <div className="card m-2 p-2" style={{width:'20rem'}}>
            <div>
                <img key={`${id}_${title}`}
                src={category.image} 
                className="card-img-top" 
                alt={title}
                style={{width:'100%',
                height:'18rem'}}
                onClick={()=>handleProductClick(id)}/>
            </div>

            <div className="card-body">
               <h5 key= {`${title}_${id}`} 
                className="card-title"
                style={{minHeight:'45px'}}
                onClick={()=>handleProductClick(id)}>{title}</h5>
                <div className='d-flex justify-content-between mt-3'>
                     <h4 key= {id} className="card-title">{price} $</h4> 
                    <div>
                        <button type="button" className="btn me-2" onClick={()=>selectFavorite({id,title, category, price})}>
                            <FontAwesomeIcon icon={faHeart} className='icon'/>
                            </button>
                        <button type="button" className="btn" onClick={()=>selectProd({id,title, category, price})}><FontAwesomeIcon icon={faBasketShopping} className='icon'/>
                        </button>
                    </div>
                </div>
                
           
            </div>
        </div>

          </>
    );
}

export default ProductCard;