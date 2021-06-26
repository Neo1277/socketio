const path = require('path');
const express = require('express');
const app = express();

//Setting
app.set('port', process.env.PORT || 4001);

//Static files
app.use(express.static(path.join(__dirname, 'src', 'public'))); 

app.post("/", function(req, res) {
  var nickname = req.body.user.nickname;
   
  console.log('nickname: ', nickname);
});

//Start server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

//Websockets
const socketIO = require('socket.io');
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New connection', socket.id);

    socket.on('username', () => {
        // In this zone receive the username 
        let user_name = socket.id; // Change socket.id (example user connection) for the username
        io.sockets.emit('username', user_name);
    });

    socket.on('users_num', () => {
        let act_users = socket.client.conn.server.clientsCount;
        io.sockets.emit('users_num', act_users);
    });
    socket.on('disconnect',() => {
        let act_users = socket.client.conn.server.clientsCount;
        io.sockets.emit('users_num', act_users);
    });    

    socket.on('message_send', (data, id) => {
        io.sockets.emit('message_send', data, socket.id);
    });
});
