function checkArray(array1, array2){
	var flag = false;
	array1.forEach(function(x){
		if(x[0] == array2[0]){
			flag = true;
		}
	});

	return flag;
}

function removeArray(array1, array2){
	var array = [];
	array1.forEach(function(x){
		if(x[0] != array2[0]){
			array.push(x);
		}
	});

	return array;
}

function removeArrayKey(array1, key){
	var array = [];
	array1.forEach(function(x){
		if(x[2] != key){
			array.push(x);
		}
	});

	return array;
}


//==========================================================

var listUserChat = [];
var express = require("express");

var app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', './views');


var server = require("http").Server(app);
var io = require('socket.io')(server);
//server.listen(3000);
server.listen(process.env.PORT || 3000);

io.on('connection', function(socket){

	socket.on('user-send-info', function(data){

		socket.emit('server-send-info-that-bai');
		if(checkArray(listUserChat, data)){
			
		}else{
			data.push(socket.id);
			listUserChat.push(data);
			socket.emit("server-send-info-thanh-cong", data);
			io.sockets.emit('server-send-listUserName', listUserChat);
		}
	});


	socket.on('user-logout', function(data){
		listUserChat = removeArray(listUserChat, data);
		io.sockets.emit('server-send-listUserName', listUserChat, socket.id);
	});

	socket.on('disconnect', function(){
		listUserChat = removeArrayKey(listUserChat, socket.id);
		io.sockets.emit('server-send-listUserName', listUserChat, socket.id);
	});

	socket.on('user-send-txt-room', function(data, txt){
	
		socket.broadcast.emit('server-send-txt-room-all', data, txt);
		socket.emit("server-send-txt-room",data, txt);
	});

	socket.on('user-send-message', function(data, id, txt){
		io.to(id).emit('server-send-message-id', data, socket.id, txt);
		socket.emit('server-send-message', txt, id);
	});

	socket.on('user-send-focusin', function(id){
		io.to(id).emit('server-send-focusin', socket.id);
	});

	socket.on('user-send-focusout', function(id){
		io.to(id).emit('server-send-focusout', socket.id);
	});

});

app.get("/", function(req, res){
	res.render('trangchu');
});