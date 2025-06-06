

const mysql = require('mysql2');
const dotenv = require("dotenv");
dotenv.config();

const database = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});


database.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err.message);
    return;
  }
  console.log("Connecté à la base de donnees 'SHOPSYSDB' depuis MYSQL ");
});

module.exports = database;

