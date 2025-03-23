import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';


function SidebarList(props) {
    const[product, setProduct]=useState([]);
          useEffect(()=>{
                  fetch ("https://api.escuelajs.co/api/v1/categories/")
                  .then (resp=>resp.json())
                  .then (data=>setProduct(data))},
                  []);
    return (
        <div className="d-block d-md-flex flex-column flex-shrink-0 p-3" style={{ width: '240px' }}>
                <h2 className="mb-1">Categories</h2>
                <ul className="nav flex-column mb-auto">
                {product.length  ?
                product.map((categories) => (
                    <li key={categories.id}>
                        <NavLink
                            to={`/${categories.id}`}
                            className={({isActive})=>isActive ? 'nav-link active' : 'nav-link link-body-emphasis'
                        }
                            style={{ color: 'black' }}
                            >
                            {categories.name}
                        </NavLink>
                    </li>)):
                    <li>No category</li>}
                </ul>
            </div>
    );
}

export default SidebarList;