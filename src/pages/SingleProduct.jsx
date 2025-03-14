import React, {useState, useEffect} from 'react';


function SingleProduct() {
   
    const [products, setProducts] = useState([]);
    const [selectedProductInfo, setSelectedProductInfo] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [error, setError] = useState(null);
  
    // Отримання списку продуктів при монтуванні компонента
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('https://api.escuelajs.co/api/v1/products');
          const data = await response.json();
          setProducts(data);
        } catch (err) {
          console.error('Помилка при отриманні продуктів:', err);
          setError('Не вдалося завантажити продукти.');
        }
      };
  
      fetchProducts();
    }, []);
  
    // Функція для отримання додаткової інформації про продукт
    const handleMoreInfo = async (productId) => {
      setLoadingDetails(true);
      setError(null);
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
        const data = await response.json();
        setSelectedProductInfo(data);
      } catch (err) {
        console.error('Помилка при отриманні деталей продукту:', err);
        setError('Не вдалося завантажити деталі продукту.');
      } finally {
        setLoadingDetails(false);
      }
    };
    
    return (
        <>
         <div className="container mt-4">
      <h1>Список продуктів</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => handleMoreInfo(product.id)}
                >
                  Більше інформації
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loadingDetails && <p>Завантаження деталей...</p>}
      {selectedProductInfo && (
        <div className="mt-4">
          <h2>Деталі продукту</h2>
          <div className="card">
            <div className="card-body">

            {/* <div style={{backgroundImage:`url(${image})` }}/>
                            <div>
                            {products.images.map((image, i) => (
                        <div
                            key={i}
                            onClick={() => setImage(image)} 
                            style={{backgroundImage:`url(${image})`}}/> ))}
                
                            </div> */}

              <h5 className="card-title">{selectedProductInfo.title}</h5>
              <p className="card-text">{selectedProductInfo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
        </>
    );
}

export default SingleProduct;