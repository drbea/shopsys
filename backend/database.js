


const mysql = require('mysql2');

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Admin123', // ajoute ton mot de passe
  database: 'shopsysdb'
});

database.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err.message);
    return;
  }
  console.log("Connecté à la base de donnees 'SHOPSYSDB' depuis MYSQL ");
});

module.exports = database;
