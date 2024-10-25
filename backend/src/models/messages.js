const Database = require('../helpers/database.js');
const DB = new Database('messages');

class MessagesModel {
  async add(messageData) {
    const { content, userId } = messageData;
    const id = crypto.randomUUID();
    const type = 'text';

    const newMessage = {
      id,
      type,
      content,
      userId,
    };

    await DB.add(newMessage);
    return newMessage;
  }

  async getAll() {
    const messages = await DB.getAll();
    return messages;
  }
}

module.exports = MessagesModel;
