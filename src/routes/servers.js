const router = require("express").Router();
const uuid = require("uuid");

let servers = [];

router.post("/create", async (req, res) => {
  //Get Req Data
  const username = req.body.username || "";
  const profilePic = req.body.profilePic || "";
  const title = req.body.title || "";
  const desc = req.body.desc || "";

  //Generate IDs
  const serverID = uuid.v4();
  const serverBucket = uuid.v4();

  //Get Timestamp
  const timestamp = Date.now();

  //Create Object
  const data = {
    username,
    profilePic,
    title,
    desc,
    serverID,
    serverBucket,
    timestamp,
  };

  //Add it to servers
  servers.push(data);

  res.status(200).json({
    status: 200,
    data: data,
  });
});

router.get("/all", async(req, res)=>{
  res.status(200).json({
    status : 200,
    data : servers
  })
})

router.delete("/end/:id", async(req, res)=>{
  //Get ID
  const id = req.params.id;
  
  //Define the server
  let finalServer = null;

  //Cycle Through all the servers and find the one with the id
  for (let i = 0; i < servers.length; i++) {
    const server = servers[i];
    if(server.serverID === id){
      finalServer = server;
      servers.splice(i, 1);
      break;
    }
  }

  res.status(200).json({
    status : 200,
    server : finalServer,
    servers : servers
  })
})
module.exports = router;
