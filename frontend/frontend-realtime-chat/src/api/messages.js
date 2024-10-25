export const saveMessageDB = async ({ message, userId }) => {
  try {
    const response = await fetch('http://localhost:3000/messages', {
      method: 'POST',
      body: JSON.stringify({
        content: message,
        userId: userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      const { newMessage } = data;
      console.log('Mensaje guardado en la base de datos con éxito', newMessage);
      return newMessage;
    }
  } catch (error) {
    console.log('Error al guardar el mensaje en la base de datos', error);
  }
};

export const getAllMessagesFromDB = async () => {
  const response = await fetch('http://localhost:3000/messages');
  if (response.ok) {
    const data = await response.json();
    console.log(
      'Mensajes obtenidos desde la base de datos correctamente',
      data
    );
    return data;
  }
};
