// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Profil from './components/profil/Profil'
import './App.css'


import {BrowserRouter,Routes,Route} from "react-router-dom" 
import Vente from "./components/pages/Ventes"
import Stocks from "./components/pages/Stocks"
import LandingPage from './components/pages/LandingPage'
import Home from "./components/pages/Home"
import GererStock from "./components/products/GererStock"
import EnregistrerVente from "./components/products/EnregistrerVente"
import AjouterProduit from "./components/products/AjouterProduit"
import Register from './components/Authentification/Register'
import ProtectedRoute from './components/Authentification/ProtectedRoute'
import Login from './components/Authentification/Login'
import Product from './components/pages/Product'


function App() {

  return (
   <BrowserRouter>


      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Routes protégées */}
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/ventes' element={<ProtectedRoute><Vente /></ProtectedRoute>} />
        <Route path='/stocks' element={<ProtectedRoute><Stocks /></ProtectedRoute>} />
        <Route path='/products' element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path='/userprofile' element={<ProtectedRoute><Profil /></ProtectedRoute>} />
        <Route path='/ajoutproduit' element={<ProtectedRoute><AjouterProduit /></ProtectedRoute>} />
        <Route path='/ajoutvente' element={<ProtectedRoute><EnregistrerVente /></ProtectedRoute>} />
      </Routes>
   </BrowserRouter>
  )
}

export default App;