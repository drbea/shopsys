

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';

import Cart from './Cart';


const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

;
  // 🔁 Appel API à l’affichage initial
  useEffect(() => {
    fetch('http://localhost:8008/api/produits')
      .then(res => res.json())
      .then(data => setProducts(data))
      // .then(data => {
      //   const withDate = data.map(p => ({
      //     ...p,
      //     addedAt: new Date(p.addedAt || Date.now())
      //   }));
      //   setProducts(withDate);
      // })
      .catch(err => console.error("Erreur lors du chargement des produits :", err));
  }, []);
  // console.log(products.forEach(el => {console.log(el.id, el.nom, el.prix, el.quantite, el.codebarre)}))
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantite: newQty } : item
      ));
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleValidateCart = () => {
    console.log("Panier validé :", cart);
    alert("Commande validée !");
    setCart([]);
  };

  const handleAddProduct = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantite: item.quantite + 1 } : item
      ));
    } else {
      setCart([...cart, { id: product.id, nom: product.nom, prix: Number(product.prix), quantite: 1 }]);
    }
    alert("Produit ajouté au panier : " + product.nom);
  };

  const filteredProducts = products
    .filter(p => p.nom.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'prix') return a.prix - b.prix;
      if (sortBy === 'quantite') return a.quantite - b.quantite;
      if (sortBy === 'nom') return a.nom.localeCompare(b.nom);
      if (sortBy === 'categorie') return a.categorie.localeCompare(b.categorie);
      return 0;
    });

  // const recentProducts = [...products]
  //   .sort((a, b) => b.addedAt - a.addedAt)
  //   .slice(0, 3);

  const recentProducts = [...products]
  .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
  .slice(0, 3);


  return (
    <div className="flex flex-col md:flex-row p-6 gap-6">
      <div className="flex-1">
        <div className="mb-4">
          <button
            onClick={toggleCart}
            className="bg-teal-700 text-white px-4 py-2 rounded shadow hover:bg-withe-700"
          >
            🛒 Voir le panier ({cart.length})
          </button>
          {isCartOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-30"
              onClick={toggleCart}
            ></div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:xl:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddClick={handleAddProduct} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">Aucun produit trouvé.</p>
          )}
        </div>
      </div>

      <Cart
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        handleValidateCart={handleValidateCart}
        isCartOpen={isCartOpen}
        toggleCart={toggleCart}
      />
      <Sidebar recentProducts={recentProducts} />
    </div>
  );
};

export default ProductsPage;
