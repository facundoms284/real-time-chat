const express = require('express');
const cors = require('cors');

const { Server } = require('socket.io');
const { createServer } = require('http');

const Database = require('./helpers/database');
const DB = new Database('images');

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
  console.log('a user connected');

  //broadcast: para emitir el mensaje a todos los usuarios conectados
  socket.on('chat message', (msg) => {
    console.log('Emitiendo mensaje de texto a todos los usuarios', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Traigo las variables de entorno desde la raíz del proyecto para usarlas aquí en el Backend.
const path = require('path');
const result = require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
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
