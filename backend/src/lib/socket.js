import { Server } from "socket.io";
import http from "http";

const userSocketMap = {};
let io; 

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

function setupSocket(app) {
  const server = http.createServer(app);

  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",              // For local development
        "https://chat-app-70bc.onrender.com" // For production
      ],
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return { server, io };
}

export { setupSocket, io };

