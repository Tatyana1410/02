import React, {useState, useEffect} from 'react';
import Block from '../components/Block';
import { useParams } from 'react-router-dom';
import Sorting from '../components/Sorting';



function Example({prod, selectProd, selectFavorite, loadMore}) {
    const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceFilter, setPriceFilter] = useState('');
  

  
    useEffect(() => {
        const fetchCategoryProducts = async () => {
          try {
            // За умови, що API підтримує фільтрацію через query-параметр categoryId
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${id}`);
            const data = await response.json();
            setProducts(data);
          } catch (err) {
            console.error('Error loading products:', err);
            setError(err.message ||'Failed to load new product categories.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchCategoryProducts();
      }, [id]);
    //   useEffect(() => {
    //     setProducts(localStorage.getItem('price', JSON.stringify(products)));
    //   }, [products]);
    
          
    
        

      if (loading) {return <p>Loading products...</p>;}
      if (error) {return <div className="alert alert-danger">{error}</div>;}
   
   
     
    return (
        <>

        {!id ?
        <div className='container'>
            {/* <Sorting/> */}
            <div className='row justify-content-between'>
                 {prod.map((obj)=>( 
            <Block key={obj.id} {...obj} selectProd={selectProd} selectFavorite={selectFavorite} /> 
                ))} 
            </div>
            <button className='btn btn-lg btn-secondary my-4' style={{width:'100%'}} onClick={loadMore}>Load more</button>
        </div> 
        :
        <div className="container" >
        <div className='row justify-content-between'>
      <h2 key={products.id}>
        {products.length>0 ? products[0].category.name:'Category'}
        </h2>
        {products.map((obj)=>( 
            <Block key={obj.id} {...obj} selectProd={selectProd} selectFavorite={selectFavorite} /> 
                ))} 
        </div>
     </div>
        }  
        </>
    );
}

export default Example;