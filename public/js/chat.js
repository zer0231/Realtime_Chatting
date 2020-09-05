var socket = io.connect('http://localhost:3001');
var message = document.getElementById('message');
var output= document.getElementById('output');
var handle= document.getElementById('handle');
var btn= document.getElementById('send');
var feedback = document.getElementById('typing');
var newuser = document.getElementById('login');
var chatbox = document.getElementById('chatbox');
var userbox = document.getElementById('userbox');
var usersdata = document.getElementById('usersdata');


newuser.addEventListener('click',function(){
  socket.emit('new user',handle.value,function(data){
    if(data){
      userbox.style.display = "none";
    }
  });
 // usersdata.innerHTML="";
});

btn.addEventListener('click',function(){
  socket.emit('chat',{
    message:message.value,
    handle:handle.value
  });
  message.value="";
});

socket.on('get users',function(data){
  
  //const total_user = data.length;
  var onlineusers="<ul class='collection with-header'>";
				for(i=0;i<data.length;i++){
					onlineusers += "<li class='collection-item grey lighten-1'>"+data[i]+"</i>";
        }
        onlineusers="</ul>";
        usersdata.innerHTML=onlineusers;
        console.log(onlineusers);
});

message.addEventListener('keypress',function(){
  socket.emit('typing',{handle:handle.value,message:message.value});
});

socket.on('chat',function(data){
  output.innerHTML +="<p><strong> <span class='green-text text-accent-3'>"+data.handle+"</span> <span class='grey-text text-lighten-3'>"+data.message+"</span></strong></p>";
  feedback.innerHTML="";
});

socket.on('typing',function(data){
  feedback.innerHTML ="<b><i> <span class='grey-text text-lighten-3'>"+data.handle+" is typing"+ data.message+"</span></i></b>";
});



socket.on('disconnect',function(data){
  //socket.emit('disconnect',{handle:handle.value,message:message.value});
  usersdata.innerHTML+=" has left";
});
