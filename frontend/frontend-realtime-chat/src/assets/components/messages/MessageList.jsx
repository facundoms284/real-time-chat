const MessageList = ({ messages, currentSocketId }) => {
  return (
    <ul className="w-full h-full flex flex-col shadow-lg bg-gray-200 bg-opacity-50 max-w-2xl rounded-md overflow-y-auto hide-scrollbar p-7 pb-16">
      {messages.map((message) => {
        return (
          <li
            key={`${message.id}-${message.type}`}
            className={`rounded-lg p-2 mb-3 ${
              message.userId === currentSocketId
                ? 'bg-green-500 text-white self-end'
                : 'bg-blue-500 text-white self-start'
            }`}
          >
            {message.type === 'text' ? (
              <span>{message.content}</span>
            ) : (
              <div className="flex flex-col ">
                <img
                  src={message.content}
                  alt="Imagen recibida"
                  className="max-w-xs rounded-lg mt-1"
                />
                <a
                  href={message.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline mt-2"
                >
                  <p>{message.content}</p>
                </a>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MessageList;
