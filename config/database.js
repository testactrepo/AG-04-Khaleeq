const pg = require('pg');
const ssh2 = require('ssh2');
// var pgHost = 'ecometer-dev.cplm2pqxxfjf.ap-south-1.rds.amazonaws.com', // remote hostname/ip
//     pgPort = 5432,
//     proxyPort = 9090,
//     ready = false;
// const privateKey = require('fs').readFileSync(__dirname + '/jigyansu');

const pgURI = 'postgres://cctyjiazreqyrt:2b8cbf2df449234d0a7d4c80ee89d28c8cc3aca2ad69ffd2b6c3390269e95287@ec2-23-20-224-166.compute-1.amazonaws.com:5432/ddvvkqm00leur2';
client = new pg.Client(pgURI);
    client.connect(function(err) {
      console.log('Database Connected !');
    });
    
    client.on('connect', () => {
    });

// var client;
// var proxy = require('net').createServer(function(sock) {
//     if (!ready)
//       return sock.destroy();
//     c.forwardOut(sock.remoteAddress, sock.remotePort, pgHost, pgPort, function(err, stream) {
//       if (err)
//         return sock.destroy();
//       sock.pipe(stream);
//       stream.pipe(sock);
//     });
//   });
//   proxy.listen(proxyPort, '127.0.0.1');
  
//   var c = new ssh2();
//   c.connect({
//     host : 'ecometer-dev.ceda.ashoka.edu.in',
//     port : 22,
//     username : 'ubuntu',
//     privateKey : privateKey
//   });
//   c.on('connect', function() {
//     console.log('Connection :: connect');
//   });
//   c.on('ready', function() {
//     ready = true;
//     var conString = 'postgres://postgres:ecometersuperlord@127.0.0.1:' + proxyPort + '/ecometer';
//         client = new pg.Client(conString);
//     client.connect(function(err) {
//       console.log('Connected !!!!');
//     });
    
//     client.on('connect', () => {
//     });
//   });


module.exports = {
    query: (text, params) => client.query(text, params),
};