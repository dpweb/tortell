tortell
=======

Determine if your users are coming from Tor endpoints.  For NodeJS based web servers.

Please note, this app uses publicly available lists, which this app downloads periodically.    
Measures are taken so that the app doesn't hammer their servers. If you modify or change settings, please use this module responsibly.    

Bug reports and pull requests are more than welcome.    

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
