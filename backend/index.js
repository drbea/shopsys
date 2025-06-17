require('dotenv').config()

const express = require("express")
const cors = require("cors")

const app = express()
const database = require("./database")
const session = require('express-session');

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

// Routes
const authRoutes = require("./routes/auth");
const produitsRoutes = require("./routes/produits");


app.use("/api", authRoutes);
app.use("/api", produitsRoutes);

app.listen(PORT, (error) => {
	if (!error) {
		console.log("App is running successfully on http://localhost:" + PORT)
	} else {
		console.log("Error occur server can't start ", error)
	}
})

