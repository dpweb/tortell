var request = require('request'),
	fs = require('fs'),
	sec = 1000, min = sec*60, 
	hour = min*60, day = hour*24,
	ef = function(){},
	torlist = [],
	debug = process.env.debug,
	hammering_nice_people = false;

var nicepeople = 'https://www.dan.me.uk/torlist/',
	path = __dirname + '/torlist.txt',

	listexpires = 1 * day,  // 1 day minimum per the site owner
	checkevery = 2 * sec;

function refreshLocalList(){
	if(hammering_nice_people){
		console.log('tortell: enabling safe mode so not to hammer other sites');
		return;
	}

	fs.stat(path, function(e, r){
		if(e || (r.mtime.getTime()+(listexpires) < new Date()-0) ){
			request.get({
				uri: nicepeople,
				headers: {
				'X-message': 'This app is github.com/dpweb/tortell',
				'X-message2': 'Any problems please post issue there',
				'X-message3': 'We appreciate this svc.  Thank you!'
				}
			}, function(e, r, b){
				if(debug) 
					console.log('Response from the interwebs', b);
				if(b.match(/Umm/)){ 
					hammering_nice_people = true;
				} else {
					fs.writeFile(path, b, ef);
				}
			})
			torlist = fs.readFileSync(path).toString().split(/\r?\n/);
		}
	})
}
refreshLocalList();
setInterval(refreshLocalList, checkevery);

module.exports = function(ip){
	if(!ip){
		console.log('tortell: given a blank ip address, are you passing a correct parameter?');
		return false;
	}
	if(torlist.length < 100){
		console.log('tortell: only', torlist.length, 'ips in the list, there is a problem');
		hammering_nice_people = true;
		return false;
	}
	if(debug)
		console.log('checking', ip, 'against torlist with', torlist.length, 'ips listed');
	
	return !!(torlist.indexOf(ip)+1);
}
