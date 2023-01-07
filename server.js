const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

//  Create a new message and Level 2 - simple validation
app.post("/messages", function (request, response) {
  const newMessage = {
    id:  request.params.id,
    from: request.body.from,
    text: request.body.text
  };
  if(newMessage.from == '' || newMessage.text == ''){
    response.status(400).send("not ok");
  }else{
    messages.push(newMessage)
    response.status(200).json(newMessage);
  }
  
});

//  Read all messages
app.get("/messages", function (request, response) {
  response.send(messages);
});

// Level 3 - more "read" functionality
app.get("/messages/search", (req, res)=>{
  const searchText = req.query.text.toLowerCase();
  const result = messages.find(msg => msg.text.toLowerCase().includes(searchText));
  res.send(result);
});

//  Read only the most recent 10 messages: /messages/latest
app.get('/messages/latest', (req, res)=>{
  const getLastTenMsg = messages.slice(0, 10)
  res.status(200).send(getLastTenMsg);
});

//  Read one message specified by an ID
app.get("/messages/:id", function (request, response) {
  const messageId = request.params.id;
  const results = messages.find(message=> message.id == messageId);
  response.status(200).send(results);
});


//  Delete a message, by ID
app.delete("/messages/:id", function (request, response) {
  const messageId = request.params.id;
  const msgIndex = messages.findIndex(message=> message.id == messageId);
  messages.splice(msgIndex)
  response.status(200).send(`This ${messageId} is already removed.`);
});

app.listen(3000, () => {
   console.log("Listening on port 3000")
  });
