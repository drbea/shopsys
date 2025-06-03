import { Link } from "react-router-dom";


export default function Sidebar({ isOpen, toggle }) {
  return (
    <div className={`bg-teal-700 text-white ${isOpen ? 'w-56' : 'w-16'} h-screen transition-all duration-300 flex flex-col`}>
      <button
        onClick={toggle}
        className="p-4 text-center font-bold focus:outline-none hover:bg-teal-800"
      >
        {isOpen ? 'SHOPSYS' : '☰'}
      </button>

      {isOpen && (
        <nav className="mt-6 space-y-2 px-4 text-sm font-medium">
          <Link to="/" className="block hover:bg-teal-800 p-2 rounded transition">Accueil</Link>

          <Link to="/products"  className="block hover:bg-teal-800 p-2 rounded transition">Produits</Link>
          <Link to="/ventes" className="block hover:bg-teal-800 p-2 rounded transition">Ventes</Link>
          {/* <Link to="" className="block hover:bg-teal-800 p-2 rounded transition">Clients</a>: */}
        </nav>
      )}
    </div>
  );
}
