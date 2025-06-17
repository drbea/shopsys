

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



  // Appel API à l’affichage initial
  const loadProducts = ()=> {
    fetch('http://localhost:8008/api/produits')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Erreur lors du chargement des produits :", err));
  } 
  useEffect(() => {
    loadProducts();

  }, []);
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

  // Fonction React pour soumettre la vente
  const enregistrerVente = async (vente) => {
    try {
        // L'URL de votre API Express
        const apiUrl = 'http://localhost:8008/api/ventes';

        const reponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(vente), 
        });

        if (!reponse.ok) {
            // Si la réponse n'est pas un succès (status 2xx)
            const erreurData = await reponse.json();
            throw new Error(erreurData.message || 'Une erreur est survenue.');
        }

        const resultat = await reponse.json();
        console.log('Succès:', resultat.message);
        alert('Vente enregistrée avec succès !');

    } catch (erreur) {
        console.error('Erreur lors de l\'envoi de la vente:', erreur);
        alert(`Erreur: ${erreur.message}`);
    }
  };


  const handleValidateCart = () => {
    console.log("Panier validé :", cart);
    const nom_client = prompt("Entrer le nom du client: ").trim();
    const ref_client = prompt("Entrer la référence client: ").trim();

    for (const element of cart) {
      const newVente = {
        nom_produit: element.nom,
        client: nom_client,
        ref_client: ref_client,
        quantite: element.quantite,
        prix_total: element.prix * element.quantite
      };
      enregistrerVente(newVente);
    }

    alert("Commande validée !");
    setCart([]);
    loadProducts();
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

  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce produit ?")) {
      fetch(`http://localhost:8008/api/produits/${id}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        loadProducts();
      })
      .catch(err => {
        console.error("Erreur suppression :", err);
        alert("Erreur lors de la suppression");
      });
    }
  };

  const filteredProducts = products
    .filter(p => p.nom.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'prix') return a.prix - b.prix;
      if (sortBy === 'quantite') return a.quantite - b.quantite;
      if (sortBy === 'nom') return a.nom.localeCompare(b.nom);
      if (sortBy === 'categorie') return a.categorie_nom.localeCompare(b.categorie_nom);
      return 0;
    });

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

        {/*Barre de rechere et de tri
          ({ search, setSearch, sortBy, setSortBy }
        */}
        <SearchBar search={search} setSearch={setSearch} sortBy={sortBy} setSortBy={setSortBy} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:xl:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddClick={handleAddProduct} handleDelete={handleDelete} onProductUpdated={ loadProducts }/>
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

