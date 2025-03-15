import React, {useState, useEffect} from 'react';
import ProductCard from '../components/ProductCard';
import { useParams, useLocation } from 'react-router-dom';


function Section({selectProd, selectFavorite}) {
    const { id } = useParams();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [prod, setProd] = useState([]);
    const [visability, setVisability] = useState(10);
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [priceFilter, setPriceFilter] = useState('');


  useEffect(() => {
    const fetchAllProducts = async () => {
        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/products/");
            const data = await response.json();
            setProd(data);
        } catch (err) {
            console.error("Failed to load products:", err);
            setError("Failed to load products.");
        }
    };
    fetchAllProducts();
}, []);
const visibleProducts = prod.slice(0, visability);

  function loadMore(){
      setVisability(visability=>visability+9)
      };
  
    useEffect(() => {
        const fetchCategoryProducts = async () => {
            if (!id) return;
          try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${id}`);
            if (!response.ok) {
                throw new Error('Failed to load new category');
              }
              const data = await response.json();
              setProducts(data);
            } catch (err) {
              console.error('Error loading products:', err);
              setError(err.message || 'Failed to load new product categories.');
            } finally {
              setLoading(false);
            }
          };
          fetchCategoryProducts();
        }, [id]);

      

// const handlePriceChange = async (e) => {
//     const value = e.target.value;
//     setPriceFilter(value);
//         try {
//             if (!value) {
//             let url = "https://api.escuelajs.co/api/v1/products/";
//             if (id) url += `?categoryId=${id}`;
//             if (priceFilter) url += `price=${priceFilter}&`;
//             if (priceMin && priceMax) url += `price_min=${priceMin}&price_max=${priceMax}`;

//             const response = await fetch(url);
//             const data = await response.json();
//             setProducts(data);}
//             else{
//                 const response = await fetch(`https://api.escuelajs.co/api/v1/products/?price=${value}`);
//                 const data = await response.json();
//                 setProducts(data);
//             }
//         } catch (err) {
//             console.error("Error:", err);
//             setError(err.message || "Error filtering products.");
//         } finally {
//             setLoading(false);
//         }};


const applyFilters = async () => {
    setLoading(true);
    setError(null);

    let url = "https://api.escuelajs.co/api/v1/products/?";
    if (priceFilter) url += `price=${priceFilter}&`;
    if (priceMin && priceMax) url += `price_min=${priceMin}&price_max=${priceMax}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ошибка при загрузке данных');
        const data = await response.json();
        setProducts(data);
    } catch (err) {
        console.error("Error applying filters:", err);
        setError(err.message || "Error applying filters.");
    } finally {
        setLoading(false);
    }
};
   
useEffect(() => {
    setPriceFilter('');
    setPriceMin('');
    setPriceMax ('');
    if (!id) {
        setProducts(prod);
    }
}, [location, prod, id]);
const handlePriceFilterChange = (e) => {
    setPriceFilter(e.target.value);
};

const handlePriceMinChange = (e) => {
    setPriceMin(e.target.value);
};

const handlePriceMaxChange = (e) => {
    setPriceMax(e.target.value);
};

if (loading) {return <p>Loading products...</p>;}
if (error) {return <div className="alert alert-danger">{error}</div>;}
     
    return (
        <>
        <div className='container'>
            <div className='input-group mb-3'>
            <input
                type="number"
                className="form-control mx-2" 
                aria-label="Search"
                autoComplete='off'
                placeholder="Введите цену"
                onChange={handlePriceFilterChange}
                value={priceFilter}
            />
                <input
                type="number"
                className="form-control mx-2" 
                aria-label="Search"
                placeholder="Минимальная цена"
                value={priceMin}
                onChange={handlePriceMinChange}
                />
                <input
                type="number"
                className="form-control mx-2" 
                aria-label="Search"
                placeholder="Максимальная цена"
                value={priceMax}
                onChange={handlePriceMaxChange}
                />
                <button className='btn btn-outline-secondary' onClick={applyFilters}>Фильтровать</button>
            </div>
            {!id &&(
            <div className='row justify-content-between'>
                 {visibleProducts.map((obj)=>( 
            <ProductCard key={obj.id} {...obj} selectProd={selectProd} selectFavorite={selectFavorite} /> 
                ))} 
            <button className='btn btn-lg btn-secondary my-4' style={{width:'100%'}} onClick={loadMore}>Load more</button>
            </div>
            )}
            {priceFilter && products.length > 0 &&(
            <div className="container" >
                {products.map((obj)=>( 
                <ProductCard key={obj.id} {...obj} selectProd={selectProd} selectFavorite={selectFavorite} /> 
                    ))} 
                </div>)}
            {priceMax && priceMin && products.length > 0 &&(
            <div className="container" >
                {products.map((obj)=>( 
                <ProductCard key={obj.id} {...obj} selectProd={selectProd} selectFavorite={selectFavorite} /> 
                    ))} 
                </div>)}
            {id &&(
            <div className='row justify-content-between'>
            <h2 key={products.id}>
                {products.length>0 ? products[0].category.name:'Category'}
            </h2>
                {products.map((obj)=>( 
                <ProductCard key={obj.id} {...obj} selectProd={selectProd} selectFavorite={selectFavorite} /> 
                ))} 
            </div>)}
     </div>
        </>
    );
}

export default Section;