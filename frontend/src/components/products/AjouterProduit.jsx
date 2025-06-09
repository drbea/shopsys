import DashboardLayout from "../dashbord/DashboardLayout"
import React, { useEffect, useState } from 'react';

const AjouterProduit = () => {
  const [categories, setCategories] = useState([]);
  const produitInfo = { nom: '', prix: '', quantite: '', categorie: '', image: null, codebarre: ""};
  const [produits, setProduit] = useState(produitInfo);

  useEffect(() => {
    fetch('http://localhost:8008/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduit({ ...produits, image: files[0] });
    } else {
      setProduit({ ...produits, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Nettoyage des espaces
    const categorieTrimmed = produits.categorie.trim();
    const nomTrimmed = produits.nom.trim();

    if (!nomTrimmed || !categorieTrimmed) {
      return alert("Le nom et la catégorie sont requis.");
    }

    const formData = new FormData();
    formData.append('nom', nomTrimmed);
    formData.append('prix', produits.prix);
    formData.append('quantite', produits.quantite);
    formData.append('categorie', categorieTrimmed);
    formData.append('codebarre', produits.codebarre.trim());
    if (produits.image) formData.append('image', produits.image);
for (let pair of formData.entries()) {
  console.log(pair[0]+ ': ' + pair[1]);
}


    try {
      const res = await fetch("http://localhost:8008/api/produits", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout");

      alert("Produit ajouté avec succès !");
      setProduit(produitInfo);
    } catch (error) {
      console.error(error);
      alert("Échec de l'ajout du produit.");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-teal-700">Ajouter un produit</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block mb-1">Nom du produit</label>
            <input
              type="text"
              name="nom"
              value={produits.nom}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Code-barres</label>
            <input
              type="text"
              name="codebarre"
              value={produits.codebarre}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              placeholder="Saisir le code-barres"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Catégorie</label>
            <input
              list="categories"
              name="categorie"
              value={produits.categorie}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              placeholder="Choisir ou saisir une catégorie"
              required
              autoComplete="off"
            />
            <datalist id="categories">
              {categories.map((cat) => (
                <option key={cat.id} value={cat.nom} />
              ))}
            </datalist>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Prix</label>
            <input
              type="number"
              name="prix"
              value={produits.prix}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Quantité</label>
            <input
              type="number"
              name="quantite"
              value={produits.quantite}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              min="0"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              accept="image/*"
            />
          </div>

          <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700">
            Ajouter
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AjouterProduit;
