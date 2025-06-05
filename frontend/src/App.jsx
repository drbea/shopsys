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
import GererStock from "./components/products/GererStock"
import EnregistrerVente from "./components/products/EnregistrerVente"
import AjouterProduit from "./components/products/AjouterProduit"
import Register from './components/Authentification/Register'
import Login from './components/Authentification/Login'
import Product from './components/pages/Product'
function App() {

  return (
   <BrowserRouter>
   {/* <LandingPage/> */}
    
   <Routes>
    <Route path='/'element={<LandingPage/>}></Route>
    <Route path='/home'element={<Home/>}></Route>
    <Route path='/ventes'element={<Vente/>}></Route>
    <Route path='/stocks'element={<Stocks/>}></Route>
    <Route path='/panier'element={<Panier/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/products' element={<Product/>}></Route>
    <Route path='/ajoutproduit' element={<AjouterProduit/>}></Route>
    <Route path='/ajoutvente' element={<EnregistrerVente/>}></Route>
    <Route path='/panier' element={<Panier/>}></Route>
   </Routes>
  
   </BrowserRouter>
  )
}

export default App;