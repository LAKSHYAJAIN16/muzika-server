//Dependencies
const express = require("express");
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server);

//Routes
const serverRoutes = require("./routes/servers");
app.use(express.json());
app.use("/api/servers/", serverRoutes);

//Socket Methods
//Start Server
const port = process.env.port || 1414;
server.listen(port);