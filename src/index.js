//Dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").Server(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Routes
const serverRoutes = require("./routes/servers");
app.use(express.json());
app.use(cors());
app.use("/api/servers/", serverRoutes);

//Socket Methods
io.on("connection", (socket) => {
  console.log("user connected");
});

//Start Server
const port = process.env.port || 1414;
server.listen(port, () => {
  console.log("listening....");
});
