const path = require("path");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ["*"],
  },
});
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
  allow_discovery: true,
});
const { v4: uuidV4 } = require("uuid");
const PORT = process.env.PORT || 443;

app.use("/peerjs", peerServer);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "views/public")));

app.get("/", (req, res) => {
  res.render("room", { roomId: "" });
});

app.get("/:room", (req, res) => {
  const room = req.params.room;
  res.render("room", { roomId: room });
});

io.on("connection", (socket) => {
  console.log("New User: " + socket.id);

  socket.on("join-room", (roomId, userId) => {
    console.log(roomId, userId);

    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);

    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message, userId);
    });

    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    });

    socket.on("share", () => {
      socket.broadcast.to(roomId).emit("screen-share", userId);
    });
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
