import { useEffect, useState } from 'react';

// Generar un ID único para el socket
const generateSocketId = () => {
  return `user-${Math.floor(Math.random() * 10000)}`;
};

//io
import io from 'socket.io-client';
export const socket = io('http://localhost:3000', {});

//api functions
import { saveMessageDB, getAllMessagesFromDB } from '../../../api/messages';

//components
import MessageList from '../messages/MessageList';
import MessageInput from '../messages/MessageInput';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [currentSocketId, setCurrentSocketId] = useState(generateSocketId()); // Estado para otorgar un id al socket

  useEffect(() => {
    socket.emit('login', { id: currentSocketId });

    // Función que se encarga de obtener todos los mensajes almacenados en la base de datos.
    const fetchMessages = async () => {
      const data = await getAllMessagesFromDB();
      if (data) {
        // Ajusto la estrucutra de los datos para mostrarlos correctamente al obtenerlos desde la database.
        const formattedMessages = data.map((message) => ({
          id: message.id,
          type: message.type,
          content: message.type === 'text' ? message.content : message.url,
          createdAt: message.createdAt,
          userId: message.userId,
        }));
        setMessages(formattedMessages);
      }
    };

    fetchMessages();

    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: msg.id,
          type: msg.type,
          content: msg.content,
          userId: msg.userId,
        },
      ]);
    });

    socket.on('new image', (imageData) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: imageData.id,
          type: imageData.type,
          content: imageData.url,
          userId: imageData.userId,
        },
      ]);
    });

    // Escuchar eventos de conexión y desconexión
    socket.on('user connected', (message) => {
      notifyMe(message);
    });

    socket.on('user disconnected', (message) => {
      notifyMe(message);
    });

    return () => {
      socket.off('chat message');
      socket.off('new image');
      socket.off('user connected');
      socket.off('user disconnected');
    };
  }, []);

  const sendMessage = async (message) => {
    // Guardar el mensaje en la base de datos
    const response = await saveMessageDB({ message, userId: currentSocketId });

    if (response) {
      const { id, type, content } = response;
      const newMessage = { id, type, content, userId: currentSocketId };

      // Solo agregar el nuevo mensaje si no se ha agregado previamente
      setMessages((prevMessages) => {
        const isDuplicate = prevMessages.some((msg) => msg.id === id);
        if (!isDuplicate) {
          return [...prevMessages, newMessage];
        }
        return prevMessages;
      });
    }
  };

  // Función que se encarga de notificar al usuario cuando alguien se conecta y/o desconecta.
  function notifyMe(message) {
    if (!('Notification' in window)) {
      alert('Este navegador no soporta notificaciones de escritorio');
    } else if (Notification.permission === 'granted') {
      new Notification(message);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(message);
        }
      });
    }
  }

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen bg-gray-100 p-10 ">
      <MessageList messages={messages} currentSocketId={currentSocketId} />
      <MessageInput
        onSendMessage={sendMessage}
        currentSocketId={currentSocketId}
      />
    </div>
  );
};

export default Chat;
