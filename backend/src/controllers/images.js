const ImagesModel = require('../models/images');
const imagesModel = new ImagesModel();

const path = require('path');
const fs = require('fs');

const { io } = require('../index');

class ImagesController {
  async add(req, res) {
    try {
      const { file } = req;
      const { userId } = req.body;
      console.log('userId', userId);

      if (!file) {
        return res.status(400).json({ message: 'Archivo no subido' });
      }

      const imageData = { file, userId };
      const newImage = await imagesModel.add(imageData);
      console.log(
        'Emitiendo imagen para todos los usuarios conectados desde el Backend'
      );
      io.emit('new image', newImage);

      res.status(201).json(newImage);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al subir la imagen', error });
    }
  }

  // Obtener todas las imagenes
  async getAll(req, res) {
    try {
      const images = await imagesModel.getAll();
      res.status(200).json(images);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al obtener las imagenes', error });
    }
  }

  // Obtener imagen por nombre de archivo
  async getByFilename(req, res) {
    try {
      const filePath = path.join(
        __dirname,
        '../public/uploads',
        req.params.filename
      );

      // Verificar si el archivo existe antes de enviarlo
      if (fs.existsSync(filePath)) {
        const image = await imagesModel.getOne(req.params.filename);
        res.sendFile(filePath);
      } else {
        res.status(404).json({ message: 'Archivo no encontrado' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al obtener la imagen', error });
    }
  }
}

module.exports = ImagesController;
