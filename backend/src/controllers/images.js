const ImagesModel = require('../models/images');
const imagesModel = new ImagesModel();

const path = require('path');
const fs = require('fs');

const { io } = require('../index');

class ImagesController {
  // Agregar una nueva imagen
  async add(req, res) {
    try {
      const { file } = req;

      if (!file) {
        return res.status(400).json({ message: 'Archivo no subido' });
      }

      // Lógica de añadir imagen en el modelo
      const imageData = { file };
      const newImage = await imagesModel.add(imageData);
      console.log(newImage);
      io.emit('new image', newImage);

      res.status(201).json(newImage); // cuando conecte con el front, extraer de newImage la url: newImage.url
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al subir la imagen', error });
    }
  }

  // obtener todas las imagenes
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
