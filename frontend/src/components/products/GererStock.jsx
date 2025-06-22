import React, { useState, useEffect } from 'react';
import DashboardLayout from "../dashbord/DashboardLayout";

const GererStock = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8008/api/produits")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Erreur lors du chargement des produits:", err));
  }, []);

  return (
      <div className="p-6 min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-teal-700">📦 Gérer les stocks</h1>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white rounded-md overflow-hidden">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">🛒 Produit</th>
                <th className="py-3 px-4 text-left">📦 Quantité</th>
                <th className="py-3 px-4 text-left">📊 État</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {products.length > 0 ? (
                products.map((product) => {
                  const isLowStock = product.quantite < 10;
                  const etat = isLowStock ? "Rupture" : "Disponible";
                  const etatStyle = isLowStock
                    ? "text-red-600 font-semibold flex items-center gap-2"
                    : "text-green-600 font-medium flex items-center gap-2";

                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-4">{product.nom}</td>
                      <td className="py-3 px-4">{product.quantite}</td>
                      <td className="py-3 px-4">
                        <span className={etatStyle}>
                          {isLowStock ? "⚠️" : "✔️"} {etat}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    Aucun produit trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default GererStock;
