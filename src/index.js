const express = require("express");
const app = express();

const port = process.env.port || 1414;
app.listen(port, () => console.log("server's live boiz"));