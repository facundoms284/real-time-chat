const Database = require('../helpers/database.js');
const DB = new Database('images');

class MessagesModel {
  async add(messageData) {
    const { content } = messageData;
    const id = crypto.randomUUID();

    const newMessage = {
      content,
      id,
    };

    await DB.add(newMessage);
    return newMessage;
  }

  async delete(messageData) {
    const { id } = messageData;
    await DB.delete(id);
    return id;
  }
}

module.exports = MessagesModel;
