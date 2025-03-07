import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Sidebar({product}) {

    const [activeItem, setActiveItem] = useState([]);

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 " style={{width: '280px'}}>
            <h2 className=" mb-1">Categories</h2>
                <ul className="nav flex-column mb-auto">
                   {product.map((categories,index)=>(
                   
                    <li key={categories.id} >
                        <NavLink to ={`/categoties/${categories.id}`}
                            className={activeItem===index ? 'nav-link active ' : 'nav-link link-body-emphasis'}
                            aria-current = "true"
                            style={{color:'black'}}
                            onClick={()=>setActiveItem(index)}>
                             {categories.name}
                        </NavLink>
                    </li>
                   
                   ))}
    
                </ul>
           
        </div>
    );
}

export default Sidebar;