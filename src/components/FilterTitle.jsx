import React, {useState, useEffect} from 'react';
import { useMemo } from 'react';

function FilterTitle(props) {
    const [products, setProducts] = useState([]);
    
    const fetchProductsByTitle = async (title) => {
        try {
          const response = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${title}`);
          if (!response.ok) {
            throw new Error('Ошибка загрузки продуктов');
          }
          const data = await response.json();
          return data; // Возвращаем список продуктов
        } catch (error) {
          console.error('Ошибка:', error);
          return [];
        }
      };

    const [searchValue, setSearchValue]=useState('');
         
    const applyTitleFilter = async () => {
        if (searchValue) {
          const filteredProducts = await fetchProductsByTitle(searchValue);
          setProducts(filteredProducts);
        } else {
          alert('Введите название продукта для поиска');
        }
      };
           
    return (
        <>
        <div className='container'>
            <div>
                <h1>Фильтрация продуктов</h1>
                <input
                    type="text"
                    placeholder="Введите название"
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                />
             <button onClick={applyTitleFilter}>Искать</button>
            </div>
            <div>
            {products.length > 0 ? (
                products.map((product) => (
                <div key={product.id}>
                    <h3>{product.title}</h3>
                    <p>Цена: {product.price} $</p>
                    <img src={product.images[0]} alt={product.title} style={{ width: '150px' }} />
                </div>
                ))
            ) : (
                <p>Товары не найдены</p>
            )}
            </div>
        </div>
            
        </>
    );
}

export default FilterTitle;