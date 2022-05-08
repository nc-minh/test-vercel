const app = require("express")();
const express = require("express");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const port = process.env.PORT || 2512;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

//config public resources
app.use("/public", express.static(path.join(__dirname, "/public")));

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
