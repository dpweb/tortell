tortell
=======

Determine if your users are coming from Tor endpoints.  For Node.JS based web servers.

http
````
var isTor = require('./tortell.js');

require('http').createServer(function(r, s){
	var client_ip = r.connection.remoteAddress;

	if(isTor(client_ip)){
		console.log(r.ip, 'is a tor endpoint');
	}

	s.end('ya');

}).listen(80);
````

Connect / Express
````
var isTor = require('./tortell.js');
var express = require('express'), app = express();

app.use(function(r, s){
	var client_ip = r.ip;

	if(isTor(client_ip)){
		console.log(r.ip, 'is a tor endpoint');
	}
})

express.listen(80);
````