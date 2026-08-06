import express from "express";
import http from "http";
import path from "path";
import { Server as SocketIOServer } from "socket.io";
import { createServer as createViteServer } from "vite";

interface Player {
  id: string;
  socketId: string;
  name: string;
  isHost: boolean;
  score: number;
  answers: (number | null)[];
  completed: boolean;
  timeUsed: number;
}

interface Room {
  code: string;
  hostId: string;
  subject: string;
  difficulty: string;
  questions: any[];
  status: "LOBBY" | "IN_GAME" | "FINISHED";
  timerSeconds: number;
  players: Player[];
  currentQuestionIndex: number;
}

const rooms: Record<string, Room> = {};
const roomTimers: Record<string, NodeJS.Timeout> = {};

function calculatePlayerScore(player: Player, questions: any[]): number {
  let score = 0;
  questions.forEach((q, idx) => {
    if (player.answers[idx] !== null && player.answers[idx] === q.answer) {
      score += 1;
    }
  });
  return score;
}

function startRoomTimer(io: SocketIOServer, code: string) {
  if (roomTimers[code]) return;
  roomTimers[code] = setInterval(() => {
    const room = rooms[code];
    if (!room || room.status !== "IN_GAME") {
      if (roomTimers[code]) {
        clearInterval(roomTimers[code]);
        delete roomTimers[code];
      }
      return;
    }

    if (room.timerSeconds > 0) {
      room.timerSeconds -= 1;
      io.to(code).emit("room_state", room);
    } else {
      room.status = "FINISHED";
      room.players.forEach((p) => {
        p.score = calculatePlayerScore(p, room.questions);
      });
      io.to(code).emit("room_state", room);
      if (roomTimers[code]) {
        clearInterval(roomTimers[code]);
        delete roomTimers[code];
      }
    }
  }, 1000);
}

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const io = new SocketIOServer(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
  });

  const PORT = 3000;

  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/rooms/:code", (req, res) => {
    const code = req.params.code.toUpperCase();
    if (rooms[code]) {
      res.json({ ok: true, room: rooms[code] });
    } else {
      res.status(404).json({ ok: false, message: "Room not found" });
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("create_room", (data) => {
      const { hostName, subject, difficulty, questions, userId } = data;
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();

      const newRoom: Room = {
        code,
        hostId: userId,
        subject,
        difficulty,
        questions: questions || [],
        status: "LOBBY",
        timerSeconds: 180,
        players: [
          {
            id: userId,
            socketId: socket.id,
            name: hostName || "Host",
            isHost: true,
            score: 0,
            answers: Array((questions || []).length).fill(null),
            completed: false,
            timeUsed: 0
          }
        ],
        currentQuestionIndex: 0
      };

      rooms[code] = newRoom;
      socket.join(code);
      socket.emit("room_state", newRoom);
      io.to(code).emit("room_state", newRoom);
    });

    socket.on("join_room", (data) => {
      const { code, playerName, userId } = data;
      const upperCode = (code || "").trim().toUpperCase();
      const room = rooms[upperCode];

      if (!room) {
        socket.emit("error_message", "Room not found. Please verify the 6-character room code.");
        return;
      }

      if (room.players.length >= 10) {
        socket.emit("error_message", "Room is full (Maximum 10 players).");
        return;
      }

      let player = room.players.find((p) => p.id === userId || p.socketId === socket.id);
      if (!player) {
        player = {
          id: userId,
          socketId: socket.id,
          name: playerName || "Player",
          isHost: false,
          score: 0,
          answers: Array(room.questions.length).fill(null),
          completed: false,
          timeUsed: 0
        };
        room.players.push(player);
      } else {
        player.socketId = socket.id;
        player.name = playerName || player.name;
      }

      socket.join(upperCode);
      io.to(upperCode).emit("room_state", room);
    });

    socket.on("start_game", (data) => {
      const { code, userId } = data;
      const room = rooms[code];
      if (!room) return;
      if (room.hostId !== userId) {
        socket.emit("error_message", "Only the room host can start the match.");
        return;
      }

      room.status = "IN_GAME";
      io.to(code).emit("room_state", room);
      startRoomTimer(io, code);
    });

    socket.on("select_answer", (data) => {
      const { code, userId, questionIndex, answerIndex } = data;
      const room = rooms[code];
      if (!room) return;

      const player = room.players.find((p) => p.id === userId || p.socketId === socket.id);
      if (player) {
        player.answers[questionIndex] = answerIndex;
        player.score = calculatePlayerScore(player, room.questions);
        io.to(code).emit("room_state", room);
      }
    });

    socket.on("change_question", (data) => {
      const { code, questionIndex } = data;
      const room = rooms[code];
      if (!room) return;

      room.currentQuestionIndex = questionIndex;
      io.to(code).emit("room_state", room);
    });

    socket.on("finish_game", (data) => {
      const { code } = data;
      const room = rooms[code];
      if (!room) return;

      room.status = "FINISHED";
      room.players.forEach((p) => {
        p.score = calculatePlayerScore(p, room.questions);
      });
      io.to(code).emit("room_state", room);
      if (roomTimers[code]) {
        clearInterval(roomTimers[code]);
        delete roomTimers[code];
      }
    });

    socket.on("leave_room", (data) => {
      const { code, userId } = data;
      const room = rooms[code];
      if (!room) return;

      room.players = room.players.filter((p) => p.id !== userId && p.socketId !== socket.id);
      socket.leave(code);

      if (room.players.length === 0) {
        if (roomTimers[code]) {
          clearInterval(roomTimers[code]);
          delete roomTimers[code];
        }
        delete rooms[code];
      } else {
        if (room.hostId === userId && room.players.length > 0) {
          room.hostId = room.players[0].id;
          room.players[0].isHost = true;
        }
        io.to(code).emit("room_state", room);
      }
    });

    socket.on("disconnect", () => {
      Object.keys(rooms).forEach((code) => {
        const room = rooms[code];
        const idx = room.players.findIndex((p) => p.socketId === socket.id);
        if (idx !== -1) {
          room.players.splice(idx, 1);
          if (room.players.length === 0) {
            if (roomTimers[code]) {
              clearInterval(roomTimers[code]);
              delete roomTimers[code];
            }
            delete rooms[code];
          } else {
            if (room.players.length > 0 && !room.players.some((p) => p.isHost)) {
              room.hostId = room.players[0].id;
              room.players[0].isHost = true;
            }
            io.to(code).emit("room_state", room);
          }
        }
      });
    });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
