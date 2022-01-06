//Dependencies
const { Socket } = require("dgram");
const express = require("express");
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server);

//Routes
const serverRoutes = require("./routes/servers");
app.use(express.json());
app.use("/api/servers/", serverRoutes);

//Socket Methods
io.on("connection", socket =>{
    socket.on("join-stream", (roomID, userID) =>{
        socket.join(roomID);
        socket.to(roomID).broadcast.emit('user-connected', userID);

        socket.on("disconnect", () =>{
            socket.to(roomID).broadcast.emit('user-disconnected', userID);
        })
    });
});
//Start Server
const port = process.env.port || 1414;
server.listen(port);