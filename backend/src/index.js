const express = require('express');
const cors = require('cors');
const path = require('path');

// Socket.io configurado para usar con Express
const { Server } = require('socket.io');
const { createServer } = require('http');

// Aplicacion express y servidor HTTp
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

module.exports = { io };

io.on('connection', (socket) => {
  // Emitir evento al cliente cuando un usuario se conecta
  socket.on('login', (data) => {
    socket.userId = data.id;
    io.emit('user connected', `${socket.userId} se ha conectado`);
  });

  socket.on('disconnect', () => {
    if (socket.userId) {
      // Emitir evento al cliente cuando un usuario se desconecta
      io.emit('user disconnected', `${socket.userId} se ha desconectado`);
    }
  });
});

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public/uploads'))); // Archivos estáticos
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
const imagesRouter = require('./router/upload');
const messagesRouter = require('./router/messages');
app.use('/images', imagesRouter);
app.use('/messages', messagesRouter);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World from Express');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
