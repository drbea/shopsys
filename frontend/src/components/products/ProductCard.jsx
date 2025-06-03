import React from 'react';

const ProductCard = ({ product }) => {
  const {
    name,
    price,
    category,
    description,
    stock,
    image,
    barcode,
  } = product;

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300">
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={`Image de ${name}`}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-lg font-bold text-green-600 mt-1">{price} €</p>
        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
          {description}
        </p>
        <div className="mt-2 text-sm text-gray-600">
          <p>En stock : <span className="font-medium">{stock}</span></p>
          <p>Code-barres : <span className="font-mono text-xs">{barcode}</span></p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
