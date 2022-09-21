import { Server } from "socket.io";

const SERVER_PORT = 3000;

const io = new Server(SERVER_PORT);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

