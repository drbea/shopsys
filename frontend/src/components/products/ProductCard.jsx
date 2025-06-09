import React from 'react';
import { Link } from "react-router-dom"

const ProductCard = ({ product, onAddClick }) => {
  const {
    nom,
    prix,
    categorie_nom,
    quantite,
    detail,
    image,
    codebarre,
    addedAt
  } = product;

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300">
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={`Image de ${nom}`}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{nom}</h2>
        <p className="text-sm text-gray-500">{categorie_nom}</p>
        <p className="text-lg font-bold text-teal-700 mt-1">{prix} €</p>
        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
          {detail}
        </p>
        <div className="mt-2 text-sm text-gray-600">
          {/*<p>En stock : <span className="font-medium">{stock}</span></p>*/}
          <p>Code-barres : <span className="font-mono text-xs">{codebarre}</span></p>
        </div>
      </div>
      <div className="p-4 flex justify-start">
        <Link to="" className="bg-teal-700 p-2 text-xl font-semibold rounded mr-2 py-auto w-auto text-center hover:bg-white hover:bg-green-600 hover:outline-2 hover:outline-offset-2 hover:outline-green-500  ...">Detail</Link>
        <button onClick={() => onAddClick(product)} className="bg-teal-700 p-2 text-xl font-semibold rounded w-auto text-center hover:bg-white hover:bg-green-600 hover:outline-2 hover:outline-offset-2 hover:outline-green-500  ...">Ajouter au panier</button>
      </div>
    </div>
  );
};

export default ProductCard;
