import React, { useState } from 'react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';

import Cart from './Cart';




// Produits simulés
const initialProducts = [
  {
    id: 1,
    name: "Casque Bluetooth",
    price: 59.99,
    category: "Audio",
    description: "Casque confortable avec réduction de bruit, autonomie 30h.",
    stock: 15,
    image: "https://m.media-amazon.com/images/I/61yrRDV1mHL.jpg",
    barcode: "1234567890123",
    addedAt: new Date("2025-06-01")
  },
  {
    id: 2,
    name: "Clavier Mécanique",
    price: 89.99,
    category: "Informatique",
    description: "Clavier RGB avec switches bleus pour une frappe agréable.",
    stock: 8,
    image: "https://m.media-amazon.com/images/I/61yrRDV1mHL.jpg",
    barcode: "2345678901234",
    addedAt: new Date("2025-06-02")
  },
  {
    id: 3,
    name: "Souris sans fil",
    price: 25.00,
    category: "Informatique",
    description: "Souris ergonomique avec capteur optique haute précision.",
    stock: 20,
    image: "https://m.media-amazon.com/images/I/61yrRDV1mHL.jpg",
    barcode: "3456789012345",
    addedAt: new Date("2025-06-03")
  },
  {
    id: 4,
    name: "Enceinte Portable",
    price: 39.99,
    category: "Audio",
    description: "Enceinte Bluetooth étanche avec basse puissante.",
    stock: 5,
    image: "https://m.media-amazon.com/images/I/61yrRDV1mHL.jpg",
    barcode: "4567890123456",
    addedAt: new Date("2025-06-01")
  },
    {
    id: 5,
    name: "Souris sans fil",
    price: 25.00,
    category: "Informatique",
    description: "Souris ergonomique avec capteur optique haute précision.",
    stock: 20,
    image: "https://m.media-amazon.com/images/I/61yrRDV1mHL.jpg",
    barcode: "3456789012345",
    addedAt: new Date("2025-06-03")
  },
    {
    id: 6,
    name: "Clavier Mécanique",
    price: 89.99,
    category: "Informatique",
    description: "Clavier RGB avec switches bleus pour une frappe agréable.",
    stock: 8,
    image: "https://m.media-amazon.com/images/I/61yrRDV1mHL.jpg",
    barcode: "2345678901234",
    addedAt: new Date("2025-06-02")
  },
];

const ProductsPage = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [products, setProducts] = useState(initialProducts);


  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

const updateQuantity = (productId, newQty) => {
  if (newQty <= 0) {
    setCart(cart.filter(item => item.id !== productId));
  } else {
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity: newQty } : item
    ));
  }
};

const removeFromCart = (productId) => {
  setCart(cart.filter(item => item.id !== productId));
};

const handleValidateCart = () => {
  // Ici tu peux envoyer le panier dans la table vente (par API, base locale, etc.)
  console.log("Panier validé :", cart);
  alert("Commande validée !");
  setCart([]); // Vider le panier
};



const handleAddProduct = (product) => {
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    // Si le produit est déjà dans le panier, on augmente la quantité
    setCart(cart.map(item =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  } else {
    // Sinon, on l'ajoute au panier avec quantité 1
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    };
    setCart([...cart, newItem]);
  }

  console.log("Produit ajouté au panier :", product.name);
  alert("Produit ajouté au panier : " + product.name);
};


  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'stock') return a.stock - b.stock;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

  const recentProducts = [...products]
    .sort((a, b) => b.addedAt - a.addedAt)
    .slice(0, 3);

  return (
    <>



    <div className="flex flex-col md:flex-row p-6 gap-6">
      <div className="flex-1">

    <div className="mb-4  top-4 ">
      <button
        onClick={toggleCart}
        className="bg-green-700 text-white px-4 py-2 rounded shadow hover:bg-withe-700"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:xl:grid-cols-3  gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddClick={handleAddProduct}/>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              Aucun produit trouvé.
            </p>
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
    {/*<div className="w-full md:w-1/4">*/}
      <Sidebar recentProducts={recentProducts} />
    {/*</div>*/}

    </div>
    </>
  );
};

export default ProductsPage;
