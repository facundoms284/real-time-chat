const { message } = require('antd');
const MessagesModel = require('../models/messages');
const messagesModel = new MessagesModel();

class MessagesController {
  async add(req, res) {
    try {
      const { content } = req.body;
      const messageData = { content };
      const newMessage = await messagesModel.add(messageData);
      res.status(201).json({ message: 'Mensaje enviado', newMessage });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al enviar mensaje', error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      console.log('id del mensaje a eliminar desde controller', id);
      const deletedMessage = await messagesModel.delete({ id });
      res.status(200).json({
        message: 'Mensaje eliminado desde el controller',
        id: deletedMessage,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al eliminar mensaje', error });
    }
  }
}

module.exports = MessagesController;
