import React, { useState, useEffect } from "react";
import UseAuth from "../Authentification/UseAuth"
import DashboardLayout from "../dashbord/DashboardLayout"

export default function Profil() {
  const [user, setUser] = useState({
    id: "",
    email: "",
    prenom: "",
    nom: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // const {savedUser, loader} = localStorage.getItem("user")
    
    const {savedUser, loading } = UseAuth()
    console.log(savedUser, loading)
    if (savedUser) {
      // setUser(JSON.parse(savedUser));
      setUser(savedUser);
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    setEditMode(false);
  };

  return (
    <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen bg-teal-50 px-4">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border border-teal-200">
            <h2 className="text-2xl font-bold text-teal-600 text-center mb-6">
              Profil Utilisateur
            </h2>

            {editMode ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-teal-700">
                    Email :
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-teal-700">
                    Nom :
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={user.nom}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-teal-700">
                    Prénom :
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={user.prenom}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
{/*                <div>
                  <label className="block text-sm font-medium text-teal-700">
                    Mot de passe :
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
*/}                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="text-teal-600 border border-teal-600 px-4 py-2 rounded hover:bg-teal-100 transition"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-teal-700">Email :</span>{" "}
                  {user.email}
                </p>
                <p>
                  <span className="font-semibold text-teal-700">Nom :</span>{" "}
                  {user.nom}
                </p>
                <p>
                  <span className="font-semibold text-teal-700">Prénom :</span>{" "}
                  {user.prenom}
                </p>
                <p>
                  <span className="font-semibold text-teal-700">
                    Mot de passe :
                  </span>{" "}
                  ******
                </p>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
    </DashboardLayout>
  );
}






/*

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://beavoguimaximeakoi:<db_password>@cluster0.nqm2qxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

*/