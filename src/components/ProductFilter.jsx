import React, { useState } from 'react';

function ProductFilter() {
  const [products, setProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState('');

  const fetchFilteredProducts = async (price) => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/?price=${price}`);
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
    const filteredProducts = await fetchFilteredProducts(priceFilter);
    setProducts(filteredProducts);
  };

  return (
    <div>
      <h1>Фильтрация продуктов</h1>
      <input
        type="number"
        placeholder="Введите цену"
        onChange={(e) => setPriceFilter(e.target.value)}
        value={priceFilter}
      />
      <button onClick={applyFilter}>Фильтровать</button>
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id}>
              <h3>{product.title}</h3>
              <p>Цена: {product.price} $</p>
            </div>
          ))
        ) : (
          <p>Продукты не найдены</p>
        )}
      </div>
    </div>
  );
}
export default ProductFilter;