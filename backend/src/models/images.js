const Database = require('../helpers/database');
const DB = new Database('images');

class ImagesModel {
  async getAll() {
    const images = await DB.getAll();

    return images.map((image) => ({
      id: image.id,
      url: image.url,
    }));
  }

  async getOne(filename) {
    const images = await DB.getAll();
    const image = images.find((image) => image.filename === filename);

    if (!image) {
      throw new Error(`Imagen con filename ${filename} no encontrada`);
    }

    // Retorno la imagen encontrada con su url, id
    const body = {
      filename,
      id: image.id,
      url: image.url,
    };
    return body;
  }

  async add(imageData) {
    const { file } = imageData;
    const id = crypto.randomUUID();
    const fileName = file.filename;

    const newImage = {
      filename: fileName,
      id,
      url: `http://localhost:3000/images/${fileName}`,
    };

    await DB.add(newImage);

    return newImage;
  }
}

module.exports = ImagesModel;
