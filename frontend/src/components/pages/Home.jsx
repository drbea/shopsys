import DashboardLayout from "../dashbord/DashboardLayout"
import { Link } from 'react-router-dom';



function Home() {

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-sky-50 p-6">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-teal-700">Dashbord ShopSys</h1>
          <Link to="/login" className="text-teal-600 hover:underline">
            Déconnexion
          </Link>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Produits</h2>
            <p className="text-2xl font-bold text-teal-600">450</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Ventes du jour</h2>
            <p className="text-2xl font-bold text-teal-600">125</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Montant caisse</h2>
            <p className="text-2xl font-bold text-teal-600">1 200 000 GNF</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Ruptures de stock</h2>
            <p className="text-2xl font-bold text-red-500">6</p>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Actions rapides</h3>
            <ul className="space-y-2 text-teal-700 font-medium">
              <li><Link to="/ajoutproduit" className="hover:underline">➕ Ajouter un produit</Link></li>
              <li><Link to="/ajoutvente" className="hover:underline">🧾 Enregistrer une vente</Link></li>
              <li><Link to="/stocks" className="hover:underline">📦 Gérer les stocks</Link></li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Activité récente</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>🛒 Vente de 3 articles (08:34)</li>
              <li>📦 Stock ajouté pour "Eau minérale"</li>
              <li>❗ Produit "Lait en poudre" en rupture</li>
            </ul>
          </div>
        </section>
      </div>
    </DashboardLayout>

  )
}

export default Home;