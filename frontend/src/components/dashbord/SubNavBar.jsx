

export default function  SubNavbar() {
return(
  <div className="bg-gray-100 h-12 flex items-center justify-between px-4 shadow-inner">
    <input
      type="text"
      placeholder="Rechercher..."
      className="p-2 border rounded w-1/3"
    />
    <div className="space-x-4">
      <button className="p-2 bg-blue-500 text-white rounded">+ Ajouter</button>
      <button className="p-2 bg-gray-300 rounded">🔔</button>
    </div>
  </div>
);
}
