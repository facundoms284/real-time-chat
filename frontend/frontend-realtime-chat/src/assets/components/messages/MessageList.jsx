const MessageList = ({ messages, onDeleteMessage }) => {
  return (
    <ul id="messages">
      {messages.map((message) => (
        <li key={message.id}>
          {message.type === 'text' ? (
            <span>{message.content}</span>
          ) : (
            <div>
              <img src={message.content.url} alt="Imagen recibida" />
              <a href={message.content.url} target="_blank">
                <p>{message.content.url}</p>
              </a>
            </div>
          )}
          <button onClick={() => onDeleteMessage(message.id)}>X</button>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
