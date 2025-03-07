import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';



function Block({title, id, category, price, description, index, selectProd}) {

   
    return (
      <>
        <div className="card m-2 p-2" style={{width:'20rem'}}>
                
            <div>
                <img key={`${id}_${title}`}
                src={category.image} 
                className="card-img-top" 
                alt={title}
                style={{width:'100%',
                height:'18rem'
            }}/>
            </div>

            <div className="card-body">
                <h5 key= {`${title}_${id}`} className="card-title">{title}</h5>
                {/* <p>{description}</p> */}
                <div className='d-flex justify-content-between '>
                    <h4 key= {id} className="card-title">{price} $</h4>
                    {/* <a key={index} href={`https://api.escuelajs.co/api/v1/products`} className="btn  btn-outline-secondary">Add to cart</a> */}
                    <div>
                        <button type="button" className="btn me-2">
                            <FontAwesomeIcon icon={faHeart} className='icon'/>
                            </button>
                        <button type="button" className="btn"><FontAwesomeIcon icon={faBasketShopping} className='icon'/>
                        </button>
                    </div>
                </div>
                
            </div>
  
        </div>
       
          </>
    );
}

export default Block;