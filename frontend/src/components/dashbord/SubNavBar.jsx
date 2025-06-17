import SearchBar from "../products/SearchBar";
import { Link } from 'react-router-dom';

export default function SubNavbar() {
  return (
    <div className="bg-teal-50 h-14 flex items-center justify-between px-4 shadow-inner">
      <div></div>
{/*      <input
        type="text"
        placeholder="Rechercher..."
        className="p-2 border border-teal-300 rounded-lg w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
      />*/}
      
      <div className="space-x-2 ml-4 flex-shrink-0">
        <Link to="/ajoutproduit" className="p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition">
          + Ajouter
        </Link>
        <button className="p-2 bg-white border border-teal-300 hover:bg-teal-100 rounded-lg text-teal-600 transition">
          🔔
        </button>
      </div>
    </div>
  );
}
