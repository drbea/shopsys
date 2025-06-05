import React from 'react';




const Sidebar = ({ recentProducts }) => {
  return (
    <div className="w-full md:w-1/4 bg-gray-50 p-4 rounded-lg shadow-md h-fit">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Nouveaux produits</h3>
      <ul className="space-y-2">
        {recentProducts.map(prod => (
          <li key={prod.id} className="text-sm text-gray-600 border-b pb-2">
            <p className="font-medium">{prod.name}</p>
            <p className="text-xs text-gray-500">{prod.category} — {prod.price}€</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
