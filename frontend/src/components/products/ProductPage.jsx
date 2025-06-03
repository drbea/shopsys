import React, { useState } from 'react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';




// Produits simulés
const initialProducts = [
  {
    id: 1,
    name: "Casque Bluetooth",
    price: 59.99,
    category: "Audio",
    description: "Casque confortable avec réduction de bruit, autonomie 30h.",
    stock: 15,
    image: "https://m.media-amazon.com/images/I/61yrRDV1mHL.jpg",
    barcode: "1234567890123",
    addedAt: new Date("2025-06-01")
  },
  {
    id: 2,
    name: "Clavier Mécanique",
    price: 89.99,
    category: "Informatique",
    description: "Clavier RGB avec switches bleus pour une frappe agréable.",
    stock: 8,
    image: "https://m.media-amazon.com/images/I/61yrRDV1mHL.jpg",
    barcode: "2345678901234",
    addedAt: new Date("2025-06-02")
  },
  {
    id: 3,
    name: "Souris sans fil",
    price: 25.00,
    category: "Informatique",
    description: "Souris ergonomique avec capteur optique haute précision.",
    stock: 20,
    image: "https://m.media-amazon.com/images/I/61yrRDV1mHL.jpg",
    barcode: "3456789012345",
    addedAt: new Date("2025-06-03")
  },
  {
    id: 4,
    name: "Enceinte Portable",
    price: 39.99,
    category: "Audio",
    description: "Enceinte Bluetooth étanche avec basse puissante.",
    stock: 5,
    image: "https://m.media-amazon.com/images/I/61yrRDV1mHL.jpg",
    barcode: "4567890123456",
    addedAt: new Date("2025-06-01")
  },
    {
    id: 5,
    name: "Souris sans fil",
    price: 25.00,
    category: "Informatique",
    description: "Souris ergonomique avec capteur optique haute précision.",
    stock: 20,
    image: "https://m.media-amazon.com/images/I/61yrRDV1mHL.jpg",
    barcode: "3456789012345",
    addedAt: new Date("2025-06-03")
  },
    {
    id: 6,
    name: "Clavier Mécanique",
    price: 89.99,
    category: "Informatique",
    description: "Clavier RGB avec switches bleus pour une frappe agréable.",
    stock: 8,
    image: "https://m.media-amazon.com/images/I/61yrRDV1mHL.jpg",
    barcode: "2345678901234",
    addedAt: new Date("2025-06-02")
  },
];

const ProductsPage = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [products, setProducts] = useState(initialProducts);

  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'stock') return a.stock - b.stock;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

  const recentProducts = [...products]
    .sort((a, b) => b.addedAt - a.addedAt)
    .slice(0, 3);

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6">
      <div className="flex-1">
        {/* <SearchBar
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
        /> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              Aucun produit trouvé.
            </p>
          )}
        </div>
      </div>

    {/*<div className="w-full md:w-1/4">*/}
      <Sidebar recentProducts={recentProducts} />
    {/*</div>*/}

    </div>
  );
};

export default ProductsPage;
