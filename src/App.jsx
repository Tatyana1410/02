import { useState, useEffect } from 'react'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Section from './pages/Section'
import Product from './components/Product'
import Authentication from './components/Authentication'
import Basket from './pages/Basket'
import Register from './components/Register'
import CategoryProducts from './pages/CategoryProducts'
import User from './pages/User'
import Checkout from './pages/Checkout'
import PrivateRoute from './components/PrivateRoute'
import NotFound from './pages/NotFound'
import ProductFilter from './components/ProductFilter'
import FilterPrice from './components/FilterPrice'
import FilterTitle from './components/FilterTitle'
import Example from './pages/Example'

import {BrowserRouter as Router, Route, Routes, Link, data} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'


function App() {

  const[product, setProduct]=useState([]);
      useEffect(()=>{
              fetch ("https://api.escuelajs.co/api/v1/categories/")
              .then (resp=>resp.json())
              .then (data=>setProduct(data))},
              []);

  const[prod, setProd]=useState([]);
  const[visability, setVisability]=useState(10);

      useEffect(()=>{
              fetch ("https://api.escuelajs.co/api/v1/products/")
              .then (resp=>resp.json())
              .then (data=>setProd(data.slice(0,visability)))
            },[visability]);

  function loadMore(){
      setVisability(visability=>visability+9)
      };

  const [selectedProduct, setSelectedProduct]=useState(()=>{
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(selectedProduct));
  }, [selectedProduct]);

  const selectProd = (product) => {
  setSelectedProduct((prevCart) => {
    const existingItem = prevCart.find((item) => item.id === product.id);
    if (existingItem) {
      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
};
const decreaseQuantity = (productId) => {
  setSelectedProduct((prevCart) =>
    prevCart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 } // Уменьшаем количество
          : item
      )
      .filter((item) => item.quantity > 0) // Удаляем товары с количеством 0
  );
};

  function remove(idx){
    setSelectedProduct(prod=>prod.filter((value,index)=>index!=idx));
  } 
  const clearCart = () => {
    const isConfirmed = window.confirm('Are you sure you want to empty your basket?');
    if (isConfirmed) {
    setSelectedProduct([]); 
    localStorage.removeItem('cart'); 
  }};
  
               
  const [favoriteProducts, setFavoriteProducts]=useState([]);
  function selectFavorite (product){
    setFavoriteProducts(favoriteProduct=>[...favoriteProduct, product])
  }
  function removeFavorite(idx){
    setFavoriteProducts(prod=>prod.filter((value,index)=>index!=idx))
  }
  const clearFavorite = () => {
    setFavoriteProducts([]); 
  };


  return (
    <>

      <Router>
        <Header prod={prod}/>
        <div className='container d-flex'>
        <Sidebar product={product}/>
          <Routes>
         
            {/* <Route path='/' element={<Section prod={prod} selectProd={selectProd} selectFavorite={selectFavorite} loadMore={loadMore}/>}/> */}
            <Route path='/:id' element={<Example prod={prod} selectProd={selectProd} selectFavorite={selectFavorite} loadMore={loadMore} product={product}/>}/>
            <Route path='/' element={<Example prod={prod} selectProd={selectProd} selectFavorite={selectFavorite} loadMore={loadMore}/>}/>
            {/* <Route path='/categories/:id' element={<CategoryProducts selectProd={selectProd} selectFavorite={selectFavorite}/>} /> */}
            <Route path='/basket' element={<Basket selectedProduct={selectedProduct} remove={remove} clearCart={clearCart} selectProd={selectProd} decreaseQuantity={decreaseQuantity}/>} />
            <Route path='/login'
            element={<Authentication />}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/products/:id' element={<Product selectProd={selectProd} selectFavorite={selectFavorite}/>}/>
            <Route path='/user' element={
              <PrivateRoute>
                <User favoriteProducts={favoriteProducts} removeFavorite={removeFavorite} selectProd={selectProd} clearFavorite={clearFavorite}/>
              </PrivateRoute>
              } ></Route>
            <Route path='/checkout' element={<Checkout selectedProduct={selectedProduct}/>}></Route>
            <Route path='/filter-price' element={<ProductFilter/>}/>
            <Route path='/filter-price-range' element={<FilterPrice/>}/>
            <Route path='/filter-title' element={<FilterTitle/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </>
  )
}

export default App
