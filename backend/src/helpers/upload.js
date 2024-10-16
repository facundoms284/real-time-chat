const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/public/uploads'); // carpeta para almacenar las imágenes
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // limito a 2 mb
  },
  fileFilter: (req, file, cb) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

    if (!validTypes.includes(file.mimetype)) {
      return cb(
        new Error('Solo se permiten archivos de tipo JPEG, PNG, JPG y GIF')
      );
    }
    cb(null, true);
  },
});

module.exports = upload;
