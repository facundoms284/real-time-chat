const Database = require('../helpers/database');
const DB = new Database('messages');

class ImagesModel {
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
    const { file, userId } = imageData;
    const id = crypto.randomUUID();
    const fileName = file.filename;
    const type = 'image';

    const newImage = {
      id,
      filename: fileName,
      type,
      url: `http://localhost:3000/images/${fileName}`,
      userId,
    };

    await DB.add(newImage);

    return newImage;
  }
}

module.exports = ImagesModel;
