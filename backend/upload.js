const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Dossier de destination
const mediaPath = path.join(__dirname, 'uploads');

// Créer le dossier s’il n’existe pas
if (!fs.existsSync(mediaPath)) {
  fs.mkdirSync(mediaPath, { recursive: true });
}

// Fonction pour nettoyer le nom du fichier
function sanitizeFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/\s+/g, '-')            // espaces -> tirets
    .replace(/[^a-z0-9-_]/g, '');    // supprime caractères spéciaux sauf - _
}

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, mediaPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = sanitizeFilename(path.basename(file.originalname, ext));
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

// Filtre de fichiers
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const extValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeValid = allowedTypes.test(file.mimetype);

  if (extValid && mimeValid) {
    cb(null, true);
  } else {
    cb(new Error("❌ Seules les images sont autorisées (jpg, png, gif, etc.)"), false);
  }
};

// Exporter le middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // ne autoriser que 5 Mo max
});

module.exports = upload;
