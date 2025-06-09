import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const logoUrl = '/logo.jpeg'; // Remplace par le vrai chemin

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({email: '', password: '',});

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({...prevData, [name]: value,}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8008/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Tu peux stocker le token ici si nécessaire
        // localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        setErrorMessage(data.message || 'Email ou mot de passe incorrect.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Erreur de connexion au serveur.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-sky-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img src={logoUrl} alt="Shopsys Logo" className="h-50 w-auto" />
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold text-center text-teal-700 mb-8">Connexion</h1>

          {errorMessage && (
            <p className="mb-4 text-red-600 text-center font-medium">{errorMessage}</p>
          )}

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Adresse Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="vous@exemple.com"
              required
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="**************"
              required
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <div className="text-right mt-1">
              <a
                href="/mot-de-passe-oublie"
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
          <Link to="/register" className="font-medium text-teal-600 hover:text-teal-800">
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
