import { ProductProvider } from './context/ProductContext';

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Section from './pages/Section'
import Product from './components/Product'
import Authentication from './components/Authentication'
import Basket from './pages/Basket'
import Register from './components/Register'
import User from './pages/User'
import Checkout from './pages/Checkout'
import PrivateRoute from './components/PrivateRoute'
import NotFound from './pages/NotFound'
import SwipeUp from './components/SwipeUp'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'


function App() {
  return (
    <>
    <ProductProvider>
      <Router>
        <Header/>
        <div className='container d-sm-flex d-block'>
        <Sidebar/>
        <SwipeUp/>
          <Routes>
            <Route path='/:id' element={<Section/>}/>
            <Route path='/' element={<Section/>}/>
            <Route path='/basket' element={<Basket/>} />
            <Route path='/login' element={<Authentication />}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/products/:id' element={<Product />}/>
            <Route path='/user' element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
              } ></Route>
            <Route path='/checkout' element={<Checkout/>}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </ProductProvider>
    </>
  )
}

export default App
