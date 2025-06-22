import React, { useState, useEffect } from "react";
import DashboardLayout from "../dashbord/DashboardLayout";
import { FaFileCsv, FaEuroSign } from "react-icons/fa";

export default function Ventes() {
  const [recherche, setRecherche] = useState("");
  const [ventesData, setVentesData] = useState([]);

  const produitsLesPlusVendus = ventesData.reduce((acc, vente) => {
  const nom = vente.nom_produit;
  if (!acc[nom]) {
      acc[nom] = {
        nom_produit: nom,
        totalVendu: 0
      };
    }
    acc[nom].totalVendu += parseInt(vente.quantite);
    return acc;
  }, {});


  useEffect(() => {
    fetch("http://localhost:8008/api/ventes")
      .then((res) => res.json())
      .then((data) => setVentesData(data))
      .catch((err) =>
        console.error("Erreur lors du chargement des données ventes :", err)
      );
  }, []);

  const ventesFiltrees = ventesData.filter((vente) =>
    vente.client.toLowerCase().includes(recherche.toLowerCase())
  );

  const totalGlobal = ventesFiltrees.reduce((total, vente) => {
    return total + parseFloat(vente.prix_total || 0);
  }, 0);


  // Regrouper les produits et totaliser les quantités vendues
  const produitsCompiles = ventesData.reduce((acc, vente) => {
    const nom = vente.nom_produit;
    acc[nom] = acc[nom] ? acc[nom] + vente.quantite : vente.quantite;
    return acc;
  }, {});

  // Trier les produits par quantité décroissante
  const produitsTries = Object.entries(produitsCompiles)
    .map(([nom_produit, totalVendu]) => ({ nom_produit, totalVendu }))
    .sort((a, b) => b.totalVendu - a.totalVendu);

  return (
<DashboardLayout>
  <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
    <h1 className="text-2xl sm:text-3xl font-bold text-teal-700 mb-6">Historique des Ventes</h1>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Colonne gauche : Historique des ventes */}
      <div className="lg:col-span-2">
        {/* Barre de recherche + bouton export */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Rechercher un client ..."
            className="w-full sm:max-w-xs p-2 border border-teal-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition">
            Exporter CSV
          </button>
        </div>

        {/* Tableau des ventes */}
        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full bg-white border border-teal-200">
            <thead>
              <tr className="bg-teal-100 text-teal-800 text-sm sm:text-base">
                <th className="p-3 border border-teal-200 text-left">Date</th>
                <th className="p-3 border border-teal-200 text-left">Client</th>
                <th className="p-3 border border-teal-200 text-left">Référence</th>
                <th className="p-3 border border-teal-200 text-left">Produit</th>
                <th className="p-3 border border-teal-200 text-left">Quantité</th>
                <th className="p-3 border border-teal-200 text-left">Total (€)</th>
              </tr>
            </thead>
            <tbody>
              {ventesFiltrees.map((vente) => (
                <tr key={vente.id} className="hover:bg-teal-50 text-sm sm:text-base">
                  <td className="p-3 border border-teal-100">{vente.date_vente}</td>
                  <td className="p-3 border border-teal-100">{vente.client}</td>
                  <td className="p-3 border border-teal-100">{vente.ref_client}</td>
                  <td className="p-3 border border-teal-100">{vente.nom_produit}</td>
                  <td className="p-3 border border-teal-100">{vente.quantite}</td>
                  <td className="p-3 border border-teal-100 text-green-600 font-semibold">
                    {vente.prix_total}
                  </td>
                </tr>
              ))}
              {ventesFiltrees.length === 0 && (
                <tr key="no-ventes">
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    Aucune vente trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totaux */}
        <div className="mt-6 text-right text-sm sm:text-base">
          <p className="font-medium">
            Total des ventes :{" "}
            <span className="text-green-600 font-bold">{totalGlobal.toFixed(2)} €</span>
          </p>
          <p className="text-gray-600">Nombre de ventes : {ventesFiltrees.length}</p>
        </div>
      </div>

    {/* Colonne droite : Produits les plus vendus */}
    <div className="bg-white rounded-lg shadow-md p-4 h-fit">
      <h2 className="text-lg font-bold text-teal-700 mb-4 flex items-center gap-2">
        🏆 Produits les plus vendus
      </h2>
      <ul className="divide-y divide-teal-100 text-sm">
        {produitsTries.slice(0, 6).map((prod, index) => {
          const placeIcons = ['🥇', '🥈', '🥉'];
          const isTop3 = index < 3;
          return (
            <li key={index} className="py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {isTop3 && <span className="text-xl">{placeIcons[index]}</span>}
                <span className={`font-medium ${isTop3 ? 'text-teal-700' : 'text-gray-700'}`}>
                  {prod.nom_produit}
                </span>
              </div>
              <span className="font-semibold text-teal-600">{prod.totalVendu}</span>
            </li>
          );
        })}
      </ul>
    </div>

    </div>
  </div>
</DashboardLayout>

  );
}
