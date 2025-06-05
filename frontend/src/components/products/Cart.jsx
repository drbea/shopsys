import React from 'react';

const Cart = ({ cart, updateQuantity, removeFromCart, handleValidateCart, isCartOpen, toggleCart }) => {
  if (!isCartOpen) return null;

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed right-0 top-0 w-full md:w-1/3 bg-white h-full shadow-lg p-6 z-40 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">🛒 Panier</h2>

      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        cart.map(item => (
          <div key={item.id} className="mb-4 border-b pb-2">
            <p className="font-bold">{item.name}</p>
            <p>Prix unitaire : {item.price.toFixed(2)} €</p>
            <p>Quantité :
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="ml-2 w-16 border rounded px-2"
              />
            </p>
            <p className="text-teal-700">Total : {(item.price * item.quantity).toFixed(2)} €</p>
            <button onClick={() => removeFromCart(item.id)} className="text-red-600 mt-2">🗑 Retirer</button>
          </div>
        ))
      )}

      <div className="mt-4 font-bold text-right">
        Total : {totalAmount.toFixed(2)} €
      </div>

      <button
        onClick={handleValidateCart}
        className="bg-teal-700 text-white mt-4 px-4 py-2 rounded shadow hover:bg-blue-800 w-full"
      >
        Valider la commande
      </button>

      <button
        onClick={toggleCart}
        className="text-sm text-gray-500 mt-2 underline block text-center"
      >
        Fermer
      </button>
    </div>
  );
};

export default Cart;
