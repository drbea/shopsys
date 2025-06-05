import DashboardLayout from "../dashbord/DashboardLayout"

import React from 'react';

const AjouterProduit = () => {
  return (
    <DashboardLayout>
      <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-teal-700">Ajouter un produit</h1>
      <form className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit</label>
          <input type="text" className="w-full border rounded px-4 py-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
          <input type="text" className="w-full border rounded px-4 py-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
          <input type="number" className="w-full border rounded px-4 py-2" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
          <input type="number" className="w-full border rounded px-4 py-2" />
        </div>
        <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700">Ajouter</button>
      </form>
      </div>
    </DashboardLayout>
  );
};

export default AjouterProduit;
