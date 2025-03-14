import React, {useState} from 'react';

function FilterTitle(props) {
    const [products, setProducts] = useState([]);
    const [titleFilter, setTitleFilter] = useState('');
    
    const fetchFilteredProducts = async (price) => {
        try {
          const response = await fetch(`[GET] https://api.escuelajs.co/api/v1/products/?${title}=Generic`);
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
        const filteredProducts = await fetchFilteredProducts(titleFilter);
        setProducts(filteredProducts);
      };
           
    return (
        <>
        <div className='container'>
            <div>
                <h1>Фильтрация продуктов</h1>
                <input
                    type="text"
                    placeholder="Введите название"
                    onChange={(e) => setTitleFilter(e.target.value)}
                    value={titleFilter}
                />
                <button onClick={applyFilter}>Фильтровать</button>
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