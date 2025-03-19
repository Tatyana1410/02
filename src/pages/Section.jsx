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
            setLoading(true)
            const response = await fetch("https://api.escuelajs.co/api/v1/products/");
            const data = await response.json();
            setProd(data.slice(0, visability))
            setProducts(data.slice(0, visability));
        } catch (err) {
            console.error("Failed to load products:", err);
            setError("Failed to load products.");
        } finally {
            setLoading(false);
        }
    };
    if (!id) fetchAllProducts();
}, [id, visability]);
    

  function loadMore(){
      setVisability(visability=>visability+10)
      };
  
    useEffect(() => {
        if(id){
            const fetchCategoryProducts = async () => {
          try {
            setLoading(true);
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
            } else {
            setProducts(prod);}
        }, [id, prod]);

const applyFilters = async () => {
    setLoading(true);
    setError(null);
    let url = "https://api.escuelajs.co/api/v1/products/?";
    if (priceFilter) url += `price=${priceFilter}`;
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
                    onChange={(e) =>setPriceFilter(e.target.value)}
                    value={priceFilter}
                />
                <input
                    type="number"
                    className="form-control mx-2" 
                    aria-label="Search"
                    placeholder="Минимальная цена"
                    value={priceMin}
                    onChange={(e) =>setPriceMin(e.target.value)}
                    />
                <input
                    type="number"
                    className="form-control mx-2" 
                    aria-label="Search"
                    placeholder="Максимальная цена"
                    value={priceMax}
                    onChange={(e) =>setPriceMax(e.target.value)}
                    />
                <button className='btn btn-outline-secondary' onClick={applyFilters}>Фильтровать</button>
            </div>
            
          
            {priceFilter && products.length > 0 &&(
            <div className='row justify-content-between'>
                {products.map((obj)=>( 
                <ProductCard key={obj.id} {...obj} selectProd={selectProd} selectFavorite={selectFavorite} /> 
                    ))} 
                </div>)} 
            {priceMax && priceMax && products.length > 0 &&(
            <div className='row justify-content-between'>
                {products.map((obj)=>( 
                <ProductCard key={obj.id} {...obj} selectProd={selectProd} selectFavorite={selectFavorite} /> 
                    ))} 
                </div>)} 

            {id && products.length > 0 &&(
                <div className='row justify-content-between'>
            <h2 key={products.id}>
                {products.length>0 ? products[0].category.name:'Category'}
            </h2>
            
                {products.map((obj)=>( 
                <ProductCard key={obj.id} {...obj} selectProd={selectProd} selectFavorite={selectFavorite} /> 
                ))} 
           </div>)}

           {!id &&(
                 <div className='row justify-content-between'>
                    {prod.map((obj)=>( 
                <ProductCard key={obj.id} {...obj} selectProd={selectProd} selectFavorite={selectFavorite} /> 
                ))} 
            <button className='btn btn-lg btn-secondary my-4' style={{width:'100%'}} onClick={loadMore}>Load more</button>
            </div>
            )}
                
        </div>  
        
        </>
    );
}

export default Section;