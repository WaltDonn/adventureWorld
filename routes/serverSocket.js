exports.init = function(io) {
	var ge = 0;
	var fame = 0;
	var fortune = 0;


	io.sockets.on('connection', function (socket) {

		socket.emit('updateKingdom', {ge: ge, fame: fame, fortune: fortune});

		socket.on('message', function (msg){
		 	io.emit('newComment', msg)
		});
		
		socket.on('updateGeS', function (msg){
			ge = ge + parseInt(msg.v);
			if(ge > 100)
				ge = 100;
			else if(ge < -100)
				ge = -100;
			io.emit('updateKingdom', {ge: ge, fame: fame, fortune: fortune});
		});
		socket.on('updateFameS', function (msg){
			fame = fame + parseInt(msg.v);
			if(fame > 100)
				fame = 100;
			else if(fame < -100)
				fame = -100;
			io.emit('updateKingdom', {ge: ge, fame: fame, fortune: fortune});
		});
		socket.on('updateFortS', function (msg){
			fortune = fortune + parseInt(msg.v);
			if(fortune > 100)
				fortune = 100;
			else if(fortune < -100)
				fortune = -100;
			io.emit('updateKingdom', {ge: ge, fame: fame, fortune: fortune});
		});

	});


}
