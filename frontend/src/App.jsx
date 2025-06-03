import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Test from "./Test"
import {BrowserRouter,Routes,Route} from "react-router-dom" 
import Vente from "./components/pages/Ventes"
import Stocks from "./components/pages/Stocks"
import Panier from "./components/pages/Panier"
import LandingPage from './components/pages/LandingPage'
import Home from "./components/pages/Home"
import Register from './components/Authentification/Register'
import Login from './components/Authentification/Login'
import Product from './components/pages/Product'
function App() {

  return (
   <BrowserRouter>
   {/* <LandingPage/> */}
   <Routes>
    <Route path='/'element={<LandingPage/>}></Route>
    <Route path='/ventes'element={<Vente/>}></Route>
    <Route path='/stocks'element={<Stocks/>}></Route>
    <Route path='/panier'element={<Panier/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/products' element={<Product/>}></Route>
   </Routes>
  
   </BrowserRouter>
  )
}

export default App;