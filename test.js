
var isTor = require('./tortell.js');

require('http').createServer(function(r, s){
	
	s.setHeader('X-message', 'Ya')
	
	var client_ip = r.connection.remoteAddress;

	if(isTor(client_ip)){
		console.log(r.ip, 'is a tor endpoint');
	}

	s.end('ya');

}).listen(80);