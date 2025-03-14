import React, { useState } from 'react';

function FilterPrice() {
  const [products, setProducts] = useState([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const fetchFilteredProductsByPrice = async (priceMin, priceMax) => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/?price_min=${priceMin}&price_max=${priceMax}`);
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
  const applyPriceFilter = async () => {
    if (priceMin && priceMax) {
      const filteredProducts = await fetchFilteredProductsByPrice(priceMin, priceMax);
      setProducts(filteredProducts);
    } else {
      alert('Пожалуйста, укажите минимальную и максимальную цену');
    }
  };

  return (
    <div>
      <h1>Поиск по ценовому диапазону</h1>
      <div>
        <input
          type="number"
          placeholder="Минимальная цена"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
        />
        <input
          type="number"
          placeholder="Максимальная цена"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          />
          <button onClick={applyPriceFilter}>Фильтровать</button>
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
    );
  }
  
  export default FilterPrice;