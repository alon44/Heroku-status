var server = require('./routing.js');
var config = require('./config.js');

server.listen(40, function () {
   console.log(config.listenMessage);
})