

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Création du dossier si non existant
const mediaPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(mediaPath)) {
  fs.mkdirSync(mediaPath, { recursive: true });
}

// Configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, mediaPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

// Filtrer les fichiers (optionnel mais conseillé)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Seules les images sont autorisées !"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 Mo max
});

module.exports = upload;
