import React from 'react';

const SearchBar = ({ search, setSearch, sortBy, setSortBy }) => {
  
  return (
    <div className="flex items-center gap-4 mb-4">
      <input
        type="text"
        placeholder="Rechercher un produit..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="px-3 py-2 border rounded-lg"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Trier par</option>
        <option value="categorie">Catégorie</option>
        <option value="nom">Nom</option>
        <option value="prix">Prix</option>
        <option value="quantite">Quantité en stock</option>
      </select>
    </div>
  );
};

export default SearchBar;
