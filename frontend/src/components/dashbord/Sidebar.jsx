
export default function  Sidebar({ isOpen, toggle }){
  return (
    <div className={`bg-gray-800 text-white ${isOpen ? 'w-54' : 'w-16'} transition-all duration-300 `}>
      <button onClick={toggle} className="p-2 text-center w-full">
        {isOpen ? 'SHOPSYS' : '☰'}
      </button>
      {isOpen && (
        <nav className="mt-4 space-y-2 px-4">
          <a href="#" className="block hover:bg-gray-700 p-2 rounded">Home</a>
          <a href="#" className="block hover:bg-gray-700 p-2 rounded">Produits</a>
          <a href="#" className="block hover:bg-gray-700 p-2 rounded">Ventes</a>
          <a href="#" className="block hover:bg-gray-700 p-2 rounded">Clients</a>
        </nav>
      )}
    </div>
  );
};

