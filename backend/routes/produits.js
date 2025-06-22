

const express = require("express");
const database = require("../database");

const upload = require("../upload");

const router = express.Router();

const PORT = process.env.PORT || 8008;

// Récupérer toutes les catégories
router.get('/categories', (req, res) => {
  database.query('SELECT * FROM categorie', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Ajouter un produit
router.post('/produits', upload.single('image'), (req, res) => {
  const { nom, prix, quantite, categorie, codebarre, detail } = req.body;
// console.log("DETAIL reçu :", detail);

  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "L'image ne peut pas être vide." });
  }

  const image = file ? `http://localhost:${PORT}/media/${file.filename}` : null;

  const sqlCategorie = `
    INSERT INTO categorie (nom) 
    VALUES (?) 
    ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)
  `;
  console.log("avant debut insertion")
  database.query(sqlCategorie, [categorie], (err, result) => {
    if (err) return res.status(500).json(err);

    const categorieId = result.insertId;

    const sqlProduit = `
      INSERT INTO produit 
      (nom, prix, quantite, image, categorie, codebarre, detail, addedAt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;
  console.log("avant debut insertion")

    database.query(sqlProduit, [nom, prix, quantite, image, categorieId, codebarre, detail], (err2) => {
      if (err2) return res.status(500).json(err2);
      res.json({ message: 'Produit ajouté avec succès' });
    });
  });
});

// Récupérer tous les produits avec leur catégorie
router.get('/produits', (req, res) => {
  const sql_query = `
    SELECT produit.*, categorie.nom AS categorie_nom 
    FROM produit 
    JOIN categorie ON produit.categorie = categorie.id
  `;

  database.query(sql_query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des produits :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json(results);
  });
});


// Supprimer un produit par ID
router.delete('/produits/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM produit WHERE id = ?';
  database.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression :", err);
      return res.status(500).json({ message: "Erreur serveur." });
    }
    res.json({ message: "Produit supprimé avec succès." });
  });
});


router.put('/produits/:id', upload.single('image'), (req, res) => {
  const { nom, prix, quantite, categorie, codebarre } = req.body;
  const { id } = req.params;
  const image = req.file ? `http://localhost:${PORT}/media/${req.file.filename}` : null;

  const updateFields = [
    "nom = ?", "prix = ?", "quantite = ?", "categorie = ?", "codebarre = ?"
  ];
  const params = [nom, prix, quantite, categorie, codebarre];

  if (image) {
    updateFields.push("image = ?");
    params.push(image);
  }

  params.push(id);

  const sql = `UPDATE produit SET ${updateFields.join(", ")} WHERE id = ?`;
  database.query(sql, params, (err) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la mise à jour" });
    res.json({ message: "Produit mis à jour" });
  });
});


// Enregistrer une vente et mettre à jour la quantité du produit
router.post('/ventes', (req, res) => {
  const { nom_produit, client, ref_client, quantite, prix_total } = req.body;

  if (!nom_produit || !quantite || !prix_total || !ref_client) {
    return res.status(400).json({ message: 'Tous les champs obligatoires ne sont pas fournis.' });
  }

  // Étape 1 : Vérifier si le produit existe et a assez de stock
  const checkStockSql = 'SELECT quantite FROM produit WHERE nom = ?';
  database.query(checkStockSql, [nom_produit], (err, results) => {
    if (err) {
      console.error("Erreur lors de la vérification du stock :", err);
      return res.status(500).json({ message: "Erreur serveur lors de la vérification du stock." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    const stockActuel = results[0].quantite;
    if (stockActuel < quantite) {
      return res.status(400).json({ message: "Stock insuffisant pour ce produit." });
    }

    // Étape 2 : Insérer la vente
    const insertVenteSql = `
      INSERT INTO ventes (nom_produit, client, ref_client, quantite, prix_total, date_vente)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    const values = [nom_produit, client, ref_client, quantite, prix_total];

    database.query(insertVenteSql, values, (err, result) => {
      if (err) {
        console.error("Erreur lors de l'enregistrement de la vente :", err);
        return res.status(500).json({ message: "Erreur serveur lors de l'enregistrement de la vente." });
      }

      // Étape 3 : Mettre à jour le stock du produit
      const updateStockSql = 'UPDATE produit SET quantite = quantite - ? WHERE nom = ?';
      database.query(updateStockSql, [quantite, nom_produit], (err2) => {
        if (err2) {
          console.error("Erreur lors de la mise à jour du stock :", err2);
          return res.status(500).json({ message: "Vente enregistrée mais erreur sur la mise à jour du stock." });
        }

        res.status(201).json({
          message: 'Vente enregistrée et stock mis à jour avec succès.',
          venteId: result.insertId
        });
      });
    });
  });
});


// Récupérer les ventes
router.get('/ventes', (req, res) => {
  const sql_query = `
    SELECT id_vente, nom_produit, client, ref_client, quantite, prix_total, date_vente 
    FROM ventes
  `;

  database.query(sql_query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des données de ventes :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json(results);
  });
});

// Route statistiques
router.get('/statistiques', (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM produit) AS total_produits,
      (SELECT COUNT(*) FROM produit WHERE quantite <= 10) AS rupture_stock,
      (SELECT IFNULL(SUM(prix_total), 0) FROM ventes) AS total_caisse,
      (SELECT IFNULL(SUM(prix_total), 0) FROM ventes WHERE DATE(date_vente) = CURDATE()) AS vente_du_jour,
      (SELECT IFNULL(SUM(quantite), 0) FROM ventes) AS total_quantite_vendue,
      (SELECT COUNT(*) FROM categorie) AS total_categories
  `;

  database.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des statistiques :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json(results[0]);
  });
});

// Activités récentes : produits + ventes
router.get('/activites-recentes', (req, res) => {
  const sqlProduits = `
    SELECT produit.id, produit.nom, produit.prix, produit.addedAt, categorie.nom AS categorie_nom
    FROM produit
    JOIN categorie ON produit.categorie = categorie.id
    ORDER BY produit.addedAt DESC
    LIMIT 5
  `;

  const sqlVentes = `
    SELECT id_vente, nom_produit, quantite, prix_total, date_vente
    FROM ventes
    ORDER BY date_vente DESC
    LIMIT 5
  `;

  database.query(sqlProduits, (errProduits, produits) => {
    if (errProduits) {
      console.error("Erreur lors de la récupération des produits récents :", errProduits);
      return res.status(500).json({ error: "Erreur produits" });
    }

    database.query(sqlVentes, (errVentes, ventes) => {
      if (errVentes) {
        console.error("Erreur lors de la récupération des ventes récentes :", errVentes);
        return res.status(500).json({ error: "Erreur ventes" });
      }

      res.json({
        produitsRecents: produits,
        ventesRecentes: ventes
      });
    });
  });
});


module.exports = router;
