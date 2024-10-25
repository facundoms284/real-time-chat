const { io } = require('../index');

const MessagesModel = require('../models/messages');
const messagesModel = new MessagesModel();

class MessagesController {
  async add(req, res) {
    try {
      const { content, userId } = req.body;

      const messageData = { content, userId };
      console.log('messageData desde controller', messageData);
      const newMessage = await messagesModel.add(messageData);

      io.emit('chat message', newMessage);

      res.status(201).json({ newMessage });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al enviar mensaje', error });
    }
  }

  async getAll(req, res) {
    try {
      const messages = await messagesModel.getAll();
      res.status(200).json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al obtener los mensajes', error });
    }
  }
}

module.exports = MessagesController;
