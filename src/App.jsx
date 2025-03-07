import { useState, useEffect } from 'react'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Section from './pages/Section'
import Product from './pages/SingleProduct'
import Authentication from './components/Authentication'
import Basket from './pages/Basket'
import SingleProduct from './pages/SingleProduct'
import Register from './components/Register'


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
  const[visability, setVisbility]=useState(10)
      useEffect(()=>{
              fetch ("https://api.escuelajs.co/api/v1/products/")
              .then (resp=>resp.json())
              .then (data=>setProd(data.slice(0,visability)))
              // .then (data=>setProd(data))
            },[visability]);

  const [selectedProduct, setSelectedProduct]=useState([]);
                
        function selectProd (product){
                    setSelectedProduct(selectProduct=>[...selectProduct, product])};
        
        function remove(idx){
                setSelectedProduct(prod=>prod.filter((value,index)=>index!=idx));} 
                // const totalPrice = selectedProduct.reduce((acc, product) => {
                //   const price = product.price || 0;
                //   return acc + price;
                // }, 0);
                console.log(selectedProduct)

  return (
    <>

      <Router>
        <Header prod={prod}/>
        <div className='container d-flex'>
        <Sidebar product={product}/>
          <Routes>
            <Route path='/' element={<Section prod={prod} selectProd={selectProd}/>}/>
            {/* <Route path={`/categoties/:${categories.id}`}/> */}
            <Route path='/products' element={<SingleProduct />} />
            <Route path='/basket' element={<Basket/>} selectedProduct={selectedProduct}/>
            <Route path='/login'
            element={<Authentication />}/>
            <Route path='/register' element={<Register/>}/>
           {/* <Route element={<PrivateRoute />}/> */}
           
          
          </Routes>
        
        </div>
        <Footer/>
      </Router>
    
    </>
  )
}

export default App
