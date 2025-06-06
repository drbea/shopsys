

const express = require("express");
const bcrypt = require("bcryptjs");
const database = require("../database");
const router = express.Router();

// Inscription
// router.post("/register", async (req, res) => {
//   const { prenom, nom, email, password } = req.body;

//   db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
//     if (err) return res.status(500).json({ message: "Erreur serveur", error: err });

//     if (results.length > 0) {
//       return res.status(400).json({ message: "Email déjà utilisé" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     db.query("INSERT INTO users (prenom, nom, email, password) VALUES (?, ?, ?, ?)",
//       [prenom, nom, email, hashedPassword],
//       (err) => {
//         if (err) return res.status(500).json({ message: "Erreur lors de l'inscription", error: err });

//         res.status(201).json({ message: "Inscription réussie" });
//       });
//   });
// });

// Connexion
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password)
  database.query("SELECT * FROM utilisateur WHERE email = ?", [email], async (err, results) => {
    // console.error("Erreur SQL:", err);
    if (err) return res.status(500).json({ message: "Erreur serveur", error: err });

    if (results.length === 0) {
      return res.status(400).json({ message: "Email incorrect" });
    }

    const user = results[0];
    console.log("\n\nuser: ", user.password, password)
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password == user.password
    console.log(isMatch)

    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Enregistrer l'utilisateur dans la session
    req.session.user = {
      id: user.id,
      email: user.email,
      prenom: user.prenom,
      nom: user.nom,
    };

    res.status(200).json({ message: "Connexion réussie", user: req.session.user });
  });
});


router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la déconnexion" });
    res.clearCookie("connect.sid");
    res.json({ message: "Déconnexion réussie" });
  });
});

router.get("/me", (req, res) => {
  console.log("Session utilisateur:", req.session.user);
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: "Non connecté" });
  }
});


module.exports = router;
