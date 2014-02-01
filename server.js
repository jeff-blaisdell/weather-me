var express = require('express');
var server = express();

server.configure(function(){
    server.use(express.static(__dirname + '/build'));
});

var port = Number(process.env.PORT || 9000);
server.listen(port);
console.log('Listening on port ' + port);