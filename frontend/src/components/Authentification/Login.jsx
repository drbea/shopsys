// Login.jsx

import React from 'react';
// Si vous utilisez react-router-dom pour d'éventuelles redirections après connexion
import { useNavigate, Link } from 'react-router-dom';

// Vous pouvez réutiliser le logo ici si vous le souhaitez
const logoUrl = '/path/to/your/shopsys-logo.png'; // REMPLACEZ CECI PAR LE VRAI CHEMIN DE VOTRE LOGO

const Login = () => {
  const navigate = useNavigate(); // Pour la redirection après connexion

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logique de connexion ici
    console.log('Tentative de connexion');
    // Exemple de redirection après une connexion réussie :
    // navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-sky-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img
            src={logoUrl}
            alt="Shopsys Logo"
            className="h-20 w-auto" 
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-xl px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-3xl font-bold text-center text-teal-700 mb-8">
            Connexion
          </h1>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Adresse Email
            </label>
            <input
              id="email"
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-150 ease-in-out"
              type="email" // Correction: type="email" au lieu de "mail"
              placeholder="vous@exemple.com"
              required
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Mot de passe
            </label>
            <input
              id="password"
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-150 ease-in-out"
              type="password"
              placeholder="**************"
              required
            />
            {/* Optionnel: Lien "Mot de passe oublié ?" */}
            <div className="text-right">
              <a
                href="/mot-de-passe-oublie" // Remplacez par votre route
                className="text-sm text-teal-600 hover:text-teal-800 font-medium"
              >
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 text-lg"
            >
              Se connecter
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 text-sm">
          Vous n'avez pas de compte ?{' '}
          <Link
            to="/register" // Remplacez par votre route d'inscription
            className="font-medium text-teal-600 hover:text-teal-800"
          >
            Inscrivez-vous
          </Link>
        </p>
      </div>
      <footer className="absolute bottom-4 text-center w-full mt-8">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Shopsys. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
};

export default Login;