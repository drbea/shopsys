require('dotenv').config()

const express = require("express")
const cors = require("cors")

const app = express()
const database = require("./database")
const session = require('express-session');

const multer = require('multer');
const path = require('path');

const frontend_url = process.env.FRONT_URL || "http://localhost:5173"
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))     

app.use(session({
  secret: 'react&expressjs@app', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true en production avec HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 jour
  }
}));

// Dossier statique pour les fichiers
app.use('/media', express.static(path.join(__dirname, 'uploads')));

// Configuration de multer pour stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // => backend/uploads/
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Récupérer toutes les catégories
app.get('/api/categories', (req, res) => {
  database.query('SELECT * FROM categorie', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Ajouter un produit

app.post('/api/produits', upload.single('image'), (req, res) => {
  const { nom, prix, quantite, categorie, codebarre } = req.body;
  const file = req.file
  if (!file) {
    return res.status(400).json({ error: "L'image ne peut pas être vide." });
  }

  const image = file ? `http://localhost:${PORT}/media/${file.filename}` : null;

  console.log("Image URL à stocker :", image, file);

  const sqlCategorie = 'INSERT INTO categorie (nom) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)';
  database.query(sqlCategorie, [categorie], (err, result) => {
    if (err) return res.status(500).json(err);

    const categorieId = result.insertId;

    const sqlProduit = `INSERT INTO produit 
      (nom, prix, quantite, image, categorie, codebarre, addedAt) 
      VALUES (?, ?, ?, ?, ?, ?, NOW())`;
    database.query(sqlProduit, [nom, prix, quantite, image, categorieId, codebarre], (err2, result2) => {
      if (err2) return res.status(500).json(err2);
      res.json({ message: 'Produit ajouté avec succès' });
    });
  });
});

app.get('/api/produits', (req, res) => {
  const sql_query = "SELECT produit.*, categorie.nom AS categorie_nom FROM produit JOIN categorie ON produit.categorie = categorie.id"
  // database.query('SELECT * FROM produit', (err, results) => {
  database.query(sql_query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des produits :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json(results);
  });
});




app.post('/api/register', (req, res) => {
  const { prenom, nom, email, password } = req.body;

  if (!prenom || !nom || !email || !password) {
    return res.status(400).json({ message: 'Champs requis manquants' });
  }

  const sql = "INSERT INTO utilisateur (prenom, nom, email, password) VALUES (?, ?, ?, ?)";
  database.query(sql, [prenom, nom, email, password], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion:", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    res.status(201).json({ message: "Utilisateur enregistré avec succès" });
  });
});


// Routes
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);


app.listen(PORT, (error) => {
	if (!error) {
		console.log("App is running successfully on http://localhost:" + PORT)
	} else {
		console.log("Error occur server can't start ", error)
	}
})

