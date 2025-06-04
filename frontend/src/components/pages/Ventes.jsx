import React, { useState } from "react";
import DashboardLayout from "../dashbord/DashboardLayout"


const ventesData = [
  {
    id: 1,
    date: "03/06/2025",
    client: "Jean Dupont",
    produit: "Clavier Mécanique",
    quantite: 1,
    total: 89.99,
  },
  {
    id: 2,
    date: "03/06/2025",
    client: "Aïssata Barry",
    produit: "Souris sans fil",
    quantite: 2,
    total: 50,
  },
  {
    id: 3,
    date: "02/06/2025",
    client: "Mamadou Keita",
    produit: "Casque Bluetooth",
    quantite: 1,
    total: 59.99,
  },
];

export default function Ventes() {
  const [recherche, setRecherche] = useState("");

  const ventesFiltrees = ventesData.filter((vente) =>
    vente.client.toLowerCase().includes(recherche.toLowerCase())
  );

  const totalGlobal = ventesFiltrees.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <DashboardLayout>
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl sm:text-3xl font-bold text-teal-700 mb-6">Historique des Ventes</h1>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher un client..."
          className="w-full sm:max-w-xs p-2 border border-teal-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition">
          Exporter CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full bg-white border border-teal-200">
          <thead>
            <tr className="bg-teal-100 text-teal-800 text-sm sm:text-base">
              <th className="p-3 border border-teal-200 text-left">Date</th>
              <th className="p-3 border border-teal-200 text-left">Client</th>
              <th className="p-3 border border-teal-200 text-left">Produit</th>
              <th className="p-3 border border-teal-200 text-left">Quantité</th>
              <th className="p-3 border border-teal-200 text-left">Total (€)</th>
            </tr>
          </thead>
          <tbody>
            {ventesFiltrees.map((vente) => (
              <tr key={vente.id} className="hover:bg-teal-50 text-sm sm:text-base">
                <td className="p-3 border border-teal-100">{vente.date}</td>
                <td className="p-3 border border-teal-100">{vente.client}</td>
                <td className="p-3 border border-teal-100">{vente.produit}</td>
                <td className="p-3 border border-teal-100">{vente.quantite}</td>
                <td className="p-3 border border-teal-100 text-green-600 font-semibold">
                  {vente.total.toFixed(2)}
                </td>
              </tr>
            ))}
            {ventesFiltrees.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  Aucune vente trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-right text-sm sm:text-base">
        <p className="font-medium">
          Total des ventes :{" "}
          <span className="text-green-600 font-bold">{totalGlobal.toFixed(2)} €</span>
        </p>
        <p className="text-gray-600">Nombre de ventes : {ventesFiltrees.length}</p>
      </div>
    </div>
    </DashboardLayout>

  );
}
