import io from 'socket.io-client';
import { useEffect, useState } from 'react';

import '../../styles/app.css';

import MessageList from '../messages/MessageList';
import MessageInput from '../messages/MessageInput';

const socket = io('http://localhost:3000');

// Función que se encarga de guardar los mensajes que se envían en la base de datos.
const saveMessageDB = async ({ message }) => {
  try {
    const response = await fetch('http://localhost:3000/messages', {
      method: 'POST',
      body: JSON.stringify({ content: message }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('mensaje guardado en la base de datos', data);
      return data;
    }
  } catch (e) {
    console.log('error al guardar el mensaje en la base de datos', e);
  }
};

const deleteMessageDB = async ({ id }) => {
  try {
    const response = await fetch(`http://localhost:3000/messages/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const data = await response.json();
      console.log('mensaje eliminado de la base de datos', data);
      return data;
    }
  } catch (e) {
    console.log('error al eliminar el mensaje de la base de datos', e);
  }
};

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      console.log('Usuario envió un mensaje de texto', msg);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'text', content: msg },
      ]);
    });

    socket.on('new image', (imageData) => {
      console.log('Usuario envió una imagen', imageData);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'image', content: imageData },
      ]);
    });

    return () => {
      socket.off('chat message');
      socket.off('new image');
    };
  }, []);

  const sendMessage = async (message) => {
    socket.emit('chat message', message);

    // Guardo el mensaje en la base de datos (images.json en el backend)
    const response = await saveMessageDB({ message });
    if (response) {
      const { newMessage } = response;
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'text', content: newMessage.content, id: newMessage.id },
      ]);
    }
  };

  const deleteMessage = async (id) => {
    console.log('id del mensaje a eliminar', id);
    if (!id) return;

    const result = await deleteMessageDB({ id });
    if (result) {
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== id)
      );
    }
  };

  return (
    <div className="container">
      <MessageList messages={messages} onDeleteMessage={deleteMessage} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
