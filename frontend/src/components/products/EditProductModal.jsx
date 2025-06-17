// components/EditProductModal.jsx
import React, { useEffect, useState } from 'react';

const EditProductModal = ({ product, onClose, onProductUpdated }) => {
  const [form, setForm] = useState({ ...product });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8008/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setForm(prev => ({ ...prev, imageFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      if (key !== "imageFile") {
        formData.append(key, form[key]);
      }
    }
    if (form.imageFile) {
      formData.append("image", form.imageFile);
    }

    const response = await fetch(`http://localhost:8008/api/produits/${form.id}`, {
      method: "PUT",
      body: formData
    });

    if (response.ok) {
      alert("Produit mis à jour !");
      onProductUpdated(); // recharge produits
      onClose();
    } else {
      alert("Erreur lors de la mise à jour.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4"
      >
        <h2 className="text-lg font-bold">Modifier le produit</h2>
        <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" className="w-full p-2 border rounded" />
        <input name="prix" value={form.prix} onChange={handleChange} placeholder="Prix" type="number" className="w-full p-2 border rounded" />
        <input name="quantite" value={form.quantite} onChange={handleChange} placeholder="Quantité" type="number" className="w-full p-2 border rounded" />
        <select name="categorie" value={form.categorie} onChange={handleChange} className="w-full p-2 border rounded">
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nom}</option>
          ))}
        </select>
        <input name="codebarre" value={form.codebarre} onChange={handleChange} placeholder="Code-barres" className="w-full p-2 border rounded" />
        <input name="detail" value={form.detail} onChange={handleChange} placeholder="detail" className="w-full p-2 border rounded" />
        <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded" />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Annuler</button>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded">Enregistrer</button>
        </div>
      </form>
    </div>
  );
};

export default EditProductModal;
