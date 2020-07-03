var socket = io.connect('http://localhost:3001');
var message = document.getElementById('message');
var output= document.getElementById('output');
var handle= document.getElementById('handle');
var btn= document.getElementById('send');
var feedback = document.getElementById('feedback');
var newuser = document.getElementById('login');
var chatbox = document.getElementById('chatbox');
var userbox = document.getElementById('userbox');
var usersdata = document.getElementById('usersdata');

newuser.addEventListener('click',function(){
  socket.emit('new user',handle.value,function(data){
    if(data){
      chatbox.style.display = "block";
      userbox.style.display = "none";
    }
  });
  usersdata.innerHTML="";
});

btn.addEventListener('click',function(){
  socket.emit('chat',{
    message:message.value,
    handle:handle.value
  });
  message.value="";
});

socket.on('get users',function(data){
  
  const total_user = data.length;
  var onlineusers=total_user +"online";
				for(i=0;i<data.length;i++){
					onlineusers += '<li class="list-group-item">'+data[i]+'</i>';
          if (total_user != data.length){
            onlineusers += '<li class="list-group-item">'+data[i]+' has left</i>';
          }
        }
        usersdata.innerHTML=onlineusers;
});

message.addEventListener('keypress',function(){
  socket.emit('typing',{handle:handle.value,message:message.value});
});

socket.on('chat',function(data){
  output.innerHTML += "<p><strong>"+data.handle+" :</strong>"+data.message+"</p>";
  feedback.innerHTML="";
});

socket.on('typing',function(data){
  feedback.innerHTML = data.handle +" is typing "+data.message;
});



socket.on('disconnect',function(data){
  //socket.emit('disconnect',{handle:handle.value,message:message.value});
  usersdata.innerHTML+=" has left";
});
