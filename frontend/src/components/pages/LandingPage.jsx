// LandingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const logoUrl = '/src/assets/logoaccueil.jpeg'; 

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-sky-100 flex flex-col items-center justify-center p-4">
      <header className="flex flex-col items-center mb-8">
        {/* Logo Shopsys */}
        <img
          src={logoUrl} 
          alt="Shopsys Logo"
          className="h-150 w-200 mb-6"
        />
      </header>

      <main className="text-center max-w-2xl">
        {/* Description de la plateforme */}
        <h1 className="text-3xl md:text-4xl font-bold text-teal-700 mb-4">
          Shopsys : Simplifiez la gestion de votre supermarché, de la réserve à la caisse.
        </h1>
        <p className="text-md md:text-lg text-gray-700 mb-6 px-4">
          Découvrez <strong>Shopsys</strong>, la plateforme de gestion intuitive et complète conçue spécifiquement pour les supermarchés. Optimisez chaque aspect de votre activité, de la gestion rigoureuse des stocks à la fluidité des ventes, en passant par une expérience de caisse efficace.
        </p>
        <div className="mt-8">
          {/* Bouton Se connecter */}
          {/* Option 1: Lien simple HTML (si pas de router React)
          <a
            href="/connexion" // Remplacez par votre URL de page de connexion
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-lg"
          >
            Se connecter
          </a> */}

          {/* Option 2: Si vous utilisez react-router-dom */}
          <Link
            to="/login"
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-lg"
          >
            Se connecter
          </Link>
         
        </div>
      </main>

      <footer className="absolute bottom-4 text-center w-full">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Shopsys. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;