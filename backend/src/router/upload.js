const express = require('express');
const router = express.Router();

const uploadFile = require('../helpers/upload');

const ImagesController = require('../controllers/images');
const newImagesController = new ImagesController();

router.post('/upload', uploadFile.single('file'), newImagesController.add);
router.get('/:filename', newImagesController.getByFilename);

module.exports = router;
