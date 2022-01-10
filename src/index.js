//Dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "CONNECT"],
  },
});

//Routes
const serverRoutes = require("./routes/servers");
app.use(express.json());
app.use(cors());
app.use("/api/servers/", serverRoutes);

//Start Server
const port = 1414;
server.listen(port, () => {
  console.log("listening....");
});

//Socket Methods
io.on("connection", (socket) => {
  console.log("user connected");

  //Read for the join-room callback
  socket.on("join-room", (roomID, userID) => {
    //Create Payload
    const payload= JSON.stringify({
      roomID : roomID,
      userID : userID
    });
    io.emit("user-connected", payload);
  });

  socket.on("broadcast-media", (media) =>{
    console.log(media);
    io.emit("broadcast", media);
  });

  //Read for the disconnect callback
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
