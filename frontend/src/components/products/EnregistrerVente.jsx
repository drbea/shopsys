import DashboardLayout from "../dashbord/DashboardLayout"

import React from 'react';

const EnregistrerVente = () => {
  return (
      <div className="p-6 min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-teal-700">Enregistrer une vente</h1>
        <form className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit</label>
            <input type="text" className="w-full border rounded px-4 py-2" placeholder="Ex: Biscuit" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantité vendue</label>
            <input type="number" className="w-full border rounded px-4 py-2" placeholder="Ex: 3" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Montant</label>
            <input type="number" className="w-full border rounded px-4 py-2" placeholder="Ex: 12000" />
          </div>
          <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700">Valider la vente</button>
        </form>
      </div>
  );
};

export default EnregistrerVente;