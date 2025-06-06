require('dotenv').config()

const express = require("express")
const cors = require("cors")

const app = express()
const database = require("./database")
const session = require('express-session');

const frontend_url = process.env.FRONT_URL || "http://localhost:5173"
console.log(frontend_url)
app.use(express.json())
// console.log(frontend_url)

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))     

app.use(session({
  secret: 'react&expressjs@app', // change cette valeur
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true en production avec HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 jour
  }
}));

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


const PORT = process.env.PORT || 5000
app.listen(PORT, (error) => {
	if (!error) {
		console.log("App is running successfully on http://localhost:" + PORT)
	} else {
		console.log("Error occur server can't start ", error)
	}
})

