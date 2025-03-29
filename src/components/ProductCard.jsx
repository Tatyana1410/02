import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


function ProductCard({title, id, images, price, selectProd, selectFavorite, category}) {

        const navigate = useNavigate();

        const handleProductClick = (id) => {
          navigate(`/products/${id}`);
        };
        

    return (
      <>
      <div className="product-inner">
        <div className="flex-wrap position-relative overflow-hidden mb-3"
        style={{minHeight:'16rem'}}>
            <img src={images[0]}
                style={{width:'100%'
                }}
                className="card-img-top"
                alt={title}
                onClick={()=>handleProductClick(id)}/>
            <div className="actions">
            <a onClick={()=>selectProd({id,title, images, price})}>
                <FontAwesomeIcon icon={faBasketShopping} 
                className='icon'/></a>
            <a onClick={()=>selectFavorite({id,title, images, price})}>
                <FontAwesomeIcon icon={faHeart} 
                className='icon'/></a>
            </div>
        </div>
        <div className="pb-2">
            <h5 className="mb-2" 
            style={{height:'45px',overflow:'hidden'}}>{title}</h5>
            <h5><span className="price">{price} $</span></h5>
        </div>
    </div>
          </>
    );
}

export default ProductCard;