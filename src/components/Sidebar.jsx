import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    const[product, setProduct]=useState([]);
      useEffect(()=>{
              fetch ("https://api.escuelajs.co/api/v1/categories/")
              .then (resp=>resp.json())
              .then (data=>setProduct(data))},
              []);
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
                };

    return (
         <>
         <div className='d-md-none'>
            <div className='d-flex '>
                <button className="hamburger-button" onClick={toggleMenu}>☰</button>
            </div>
            {isOpen &&(
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
            </div>)}
        </div>
        
        <div className='d-none d-md-flex'>
            <div className="d-block d-md-flex flex-column flex-shrink-0 p-3" style={{ width: '240px' }}>
                <h2 className="mb-1">Categories</h2>
                <ul className="nav flex-column mb-auto">
                {product.length  ?
                product.map((categories) => (
                    <li key={categories.id}>
                        <NavLink
                            to={`/${categories.id}`}
                            className={({isActive})=>isActive ? 'nav-link active' : 'nav-link link-body-emphasis'}
                            style={{ color: 'black' }}
                            >
                            {categories.name}
                        </NavLink>
                    </li>)):
                    <li>No category</li>}
                </ul>
            </div>
        </div>
        </>
        
    );
}

export default Sidebar;