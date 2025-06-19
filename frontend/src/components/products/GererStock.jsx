import React, { useState, useEffect } from 'react';

import DashboardLayout from "../dashbord/DashboardLayout"

const GererStock = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const product_urls = "http://localhost:8008/api/produits"
    fetch(product_urls)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Erreur lors du chargement des produits: ", err))
  }, [])

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-teal-700">Gérer les stocks</h1>
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-teal-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Produit</th>
            <th className="py-3 px-4 text-left">Quantité</th>
            <th className="py-3 px-4 text-left">État</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          <tr>
            <td className="py-3 px-4">Eau minérale</td>
            <td className="py-3 px-4">30</td>
            <td className="py-3 px-4">En stock</td>
            <td className="py-3 px-4">
              <button className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">Modifier</button>
            </td>
          </tr>
          {/* Répéter pour d'autres produits */}
          {products.length > 0 ? (
            products.map(product => (
              <tr key={product.id}>
                <td className="py-3 px-4">{product.nom}</td>
                <td className="py-3 px-4">{product.quantite}</td>
                <td className={`py-3 px-4 ${product.quantite < 10 ? 'bg-red-600 text-white rounded text-center' : 'px-4 py-3'}`}>{product.quantite < 10 ? "rupture" : "disponible"}</td>
                <td className="py-3 px-4">
                  <button className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">Modifier</button>
                </td>            
              </tr>
            ))
            ):(
            <>
              <tr className="text-gray-500 text-center col-span-full"><td>Aucun produit trouvé.</td></tr>
            </>
            )}
        </tbody>
      </table>
    </div>
  );
};

export default GererStock;