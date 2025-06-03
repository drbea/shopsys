// Register.jsx

import React from 'react';

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-sky-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl px-8 pt-6 pb-8 mb-4">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-8">Créer un compte</h2>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Adresse Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="exemple@mail.com"
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-150 ease-in-out"
              required
            />
          </div>

          <div>
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-semibold mb-2">
              Prénom
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Ex: Luc"
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-150 ease-in-out"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-semibold mb-2">
              Nom
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Ex: Du Pont"
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-150 ease-in-out"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              placeholder="**************"
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-150 ease-in-out"
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 text-lg"
            >
              S'inscrire
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Vous avez déjà un compte ?{' '}
          <a
            href="/connexion"
            className="font-medium text-teal-600 hover:text-teal-800"
          >
            Connectez-vous
          </a>
        </p>
      </div>

      <footer className="absolute bottom-4 text-center w-full mt-8">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Shopsys. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}
