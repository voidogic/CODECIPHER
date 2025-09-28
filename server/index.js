const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const ACTIONS = require("./Actions");
const cors = require("cors");
const axios = require("axios");
const server = http.createServer(app);
require("dotenv").config();

const languageConfig = {
  python3: { versionIndex: "3" },
  java: { versionIndex: "3" },
  cpp: { versionIndex: "4" },
  nodejs: { versionIndex: "3" },
  c: { versionIndex: "4" },
  ruby: { versionIndex: "3" },
  go: { versionIndex: "3" },
  scala: { versionIndex: "3" },
  bash: { versionIndex: "3" },
  sql: { versionIndex: "3" },
  pascal: { versionIndex: "2" },
  csharp: { versionIndex: "3" },
  php: { versionIndex: "3" },
  swift: { versionIndex: "3" },
  rust: { versionIndex: "3" },
  r: { versionIndex: "3" },
};

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};
const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
};

io.on("connection", (socket) => {
  console.log('Socket connected', socket.id);
  console.log('Total connected clients:', io.engine.clientsCount);
  
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    console.log(`User ${username} joining room ${roomId}`);
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    // notify that new user join
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  // sync the code
  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    console.log(`Code change in room ${roomId}, broadcasting to other clients`);
    console.log(`Code length: ${code ? code.length : 0} characters`);
    console.log(`Code preview: ${code ? code.substring(0, 50) + '...' : 'null'}`);
    socket.to(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });
  // when new user join the room all the code which are there are also shows on that persons editor
  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    console.log(`Syncing code to socket ${socketId}`);
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // leave room
  socket.on("disconnecting", () => {
    console.log(`Socket ${socket.id} disconnecting`);
    const rooms = [...socket.rooms];
    // leave all the room
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });

    delete userSocketMap[socket.id];
    socket.leave();
  });
});

app.post("/compile", async (req, res) => {
  const { code, language, stdin } = req.body;


  
  try {
    const clientId =
      process.env.JDOODLE_CLIENT_ID || process.env.jDoodle_clientId || "";
    const clientSecret =
      process.env.JDOODLE_CLIENT_SECRET ||
      process.env.jDoodle_clientSecret ||
      process.env.kDoodle_clientSecret ||
      "";

    if (!clientId || !clientSecret) {
      return res.status(400).json({
        error:
          "JDoodle credentials missing. Set JDOODLE_CLIENT_ID and JDOODLE_CLIENT_SECRET in server/.env",
      });
    }

    const response = await axios.post("https://api.jdoodle.com/v1/execute", {
      script: code,
      language: language,
      versionIndex: languageConfig[language].versionIndex,
      clientId,
      clientSecret,
      stdin: stdin || "",
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to compile code" });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is runnint on port ${PORT}`));
