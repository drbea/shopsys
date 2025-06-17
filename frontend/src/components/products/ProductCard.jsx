import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";
import EditProductModal from './EditProductModal'

const ProductCard = ({ product, onAddClick, handleDelete, onProductUpdated }) => {
  const {
    nom,
    prix,
    categorie_nom,
    quantite,
    detail,
    image,
    codebarre
  } = product;

  const [showEdit, setShowEdit] = useState(false);

  const estIndisponible = quantite <= 0;
  const faibleStock = quantite > 0 && quantite < 10;

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300 relative">
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={`Image de ${nom}`}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{nom}</h2>
        <p className="text-sm text-gray-500">{categorie_nom}</p>
        <p className="text-lg font-bold text-teal-700 mt-1">{prix} €</p>
        <p className="text-sm text-gray-700 mt-2 line-clamp-2">{detail}</p>
        <div className="mt-2 text-sm text-gray-600">
          <p>Code-barres : <span className="font-mono text-xs">{codebarre}</span></p>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between">
        <Link
          to=""
          className="bg-teal-700 p-2 text-sm font-semibold rounded mr-2 text-white hover:bg-white hover:text-green-700 hover:outline hover:outline-2 hover:outline-green-500 transition"
        >
          Détail
        </Link>

        {estIndisponible ? (
          <button
            disabled
            className="bg-gray-400 cursor-not-allowed p-2 text-sm font-semibold rounded text-white"
            aria-label="Produit indisponible"
          >
            Indisponible
          </button>
        ) : (
          <div className="relative">
            {faibleStock && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {quantite}
              </span>
            )}
            <button
              onClick={() => onAddClick(product)}
              className="bg-teal-700 p-2 justify-center text-sm font-semibold rounded text-white hover:bg-white hover:text-green-700 hover:outline hover:outline-2 hover:outline-green-500 transition"
              aria-label="Ajouter au panier"
            >
              Ajouter au panier
            </button>

            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-600 p-2 text-sm font-semibold rounded text-white hover:bg-white hover:text-red-600 hover:outline hover:outline-2 hover:outline-red-500 transition"
            >
              Supprimer
            </button>

          </div>
        )}
      </div>

      {/*modification*/}
      <div className="p-4 flex justify-between">
        <button
          onClick={() => setShowEdit(true)}
          className="bg-yellow-500 px-2 py-1 text-white text-sm rounded hover:bg-yellow-600"
        >
          Modifier
        </button>

        {/* bouton Ajouter */}
      </div>

      {showEdit && (
        <EditProductModal
          product={product}
          onClose={() => setShowEdit(false)}
          onProductUpdated={onProductUpdated}
        />
      )}
    </div>
  );
};
export default ProductCard;
