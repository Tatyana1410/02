import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Sidebar({product}) {

    const [activeItem, setActiveItem] = useState(null);
    const [products, setProducts] = useState([]);
    const [priceFilter, setPriceFilter] = useState('');
   
            const fetchPrice = async (priceFilter) => {
                try {
                  const response = await fetch(`https://api.escuelajs.co/api/v1/products/?price=${priceFilter}`);
                  if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                  }
                  const data = await response.json();
                  return data;
                } catch (error) {
                  console.error('Ошибка:', error);
                  return [];
                }
              };
              
    const applyFilter = async () => {
        const filteredProducts = await fetchPrice(priceFilter);
        setProducts(filteredProducts);
      };
      console.log(products)
      useEffect(() => {
        localStorage.setItem('price', JSON.stringify(products));
      }, [products]);

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3" style={{ width: '280px' }}>
            <h2 className="mb-1">Categories</h2>
            <ul className="nav flex-column mb-auto">
                {product.map((categories, index) => (
                <li key={categories.id}>
                    <NavLink
                    to={`/${categories.id}`}
                    className={activeItem === index ? 'nav-link active' : 'nav-link link-body-emphasis'}
                    style={{ color: 'black' }}
                    onClick={() => setActiveItem(index)}>
                    {categories.name}
                    </NavLink>
                </li>
                ))}
            </ul>

            
            <div>
            <h1>Фильтрация продуктов</h1>
            <input
                type="number"
                placeholder="Введите цену"
                onChange={(e) => setPriceFilter(e.target.value)}
                value={priceFilter}
            />
            <button onClick={applyFilter}>Фильтровать</button>
            </div>



        </div>

        
         
    );
}

export default Sidebar;