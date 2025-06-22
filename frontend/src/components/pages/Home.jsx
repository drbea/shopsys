import React, { useEffect, useState } from 'react';
import { FaBoxOpen, FaExclamationTriangle, FaMoneyBillWave, FaShoppingCart, FaChartPie, FaTags } from 'react-icons/fa';

import DashboardLayout from "../dashbord/DashboardLayout"
const Dashboard = () => {
  const [stats, setStats] = useState({
    total_produits: 0,
    rupture_stock: 0,
    total_caisse: 0,
    vente_du_jour: 0,
    total_quantite_vendue: 0,
    total_categories: 0
  });

  const [recentProducts, setRecentProducts] = useState([]);
  const [recentSales, setRecentSales] = useState([]);


  useEffect(() => {
    fetch("http://localhost:8008/api/statistiques")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Erreur stats :", err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8008/api/activites-recentes')
      .then(res => res.json())
      .then(data => {
        setRecentProducts(data.produitsRecents);
        setRecentSales(data.ventesRecentes);
      })
      .catch(err => console.error("Erreur lors du chargement des activités :", err));
  }, []);

  const formatNumber = (n) => Number(n).toLocaleString("fr-FR");

  return (
    <DashboardLayout>
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Tableau de bord</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Produits en stock" value={stats.total_produits} icon={<FaBoxOpen />} color="bg-blue-500" />
          <StatCard label="Ruptures de stock" value={stats.rupture_stock} icon={<FaExclamationTriangle />} color="bg-red-500" />
          <StatCard label="Catégories" value={stats.total_categories} icon={<FaTags />} color="bg-yellow-500" />

          <StatCard label="Total en caisse (GNF)" value={formatNumber(stats.total_caisse)} icon={<FaMoneyBillWave />} color="bg-green-500" />
          <StatCard label="Ventes du jour" value={formatNumber(stats.vente_du_jour)} icon={<FaShoppingCart />} color="bg-indigo-500" />
          <StatCard label="Quantité vendue" value={formatNumber(stats.total_quantite_vendue)} icon={<FaChartPie />} color="bg-purple-500" />
        </div>

        <div className="mt-15 ">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">📋 Dernières activités</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Derniers produits */}
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-teal-700 font-semibold mb-2">🆕 Derniers produits</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {recentProducts.map(prod => (
                <li key={prod.id}>
                  <strong>{prod.nom}</strong> - {prod.prix}€ ({prod.categorie_nom})
                </li>
              ))}
            </ul>
          </div>

          {/* Dernières ventes */}
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-teal-700 font-semibold mb-2">💸 Dernières ventes</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {recentSales.map(vente => (
                <li key={vente.id_vente}>
                  {vente.nom_produit} × {vente.quantite} – {vente.prix_total}€
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      </div>

    </DashboardLayout>
  );
};

const StatCard = ({ label, value, color, icon }) => (
  <div className={`p-6 rounded-lg shadow-md text-white ${color} flex items-center justify-between transition-transform hover:scale-105 duration-200`}>
    <div>
      <div className="text-xl font-semibold">{label}</div>
      <div className="text-3xl mt-2 font-bold">{value}</div>
    </div>
    <div className="text-4xl opacity-70">
      {icon}
    </div>
  </div>
);

export default Dashboard;
