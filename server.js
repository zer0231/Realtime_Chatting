var express = require('express');
var socket = require('socket.io');
const app = express();
const authRoutes = require('./routes/authRoutes');
//setting view engine
app.set('view engine','ejs')

// middleware
app.use(express.static('public'));
app.use(express.json());
//app.use(cookieParser());

users =[];
socket_connected =[];
var server = app.listen(3001,function(){
  console.log("server running");
});



var io = socket(server);

io.on('connection',function(socket){
  socket_connected.push(socket);
  console.log("connected:",socket.id);



  //handle chat event
  socket.on('chat',function(data){
    io.sockets.emit('chat',data);
    console.log("chat data:"+data.message+"--hmm--"+data.handle);
  });

  socket.on('typing',function(data){
    socket.broadcast.emit('typing',data);
  });

  socket.on('new user',function(data,callback){
     callback(true);
    socket.username = data;
    //users.push(data);
    users.push(socket.username);
    updateUsernames();
  //  console.log("These bitches are online:",users)
  });
  
  socket.on('disconnect',function(data){
    users.splice(users.indexOf(socket.username),1);
  	//console.log(socket.handle)
    updateUsernames();
  	socket_connected.splice(socket_connected.indexOf(socket),1);
  	//console.log('disconected:',data);

    //socket.broadcast.emit('disconnect',data);
  });

  function updateUsernames(){
		io.sockets.emit('get users',users);
	}

});
app.get('/', (req, res) => res.render('index'));
app.use(authRoutes);

