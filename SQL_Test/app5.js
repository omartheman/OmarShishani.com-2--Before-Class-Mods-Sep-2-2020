// 
// Hacked together from http://utahjs.com/2010/09/22/nodejs-and-mysql-introduction/
//

var Client = require('mysql').Client;
var client = new Client(); 
client.host ='server255.web-hosting.com';
client.user = 'user';
client.password = 'password';
console.log("connecting...");
client.connect(function(err, results) {
    if (err) {
        console.log("ERROR: " + err.message);
        throw err;
    }
    console.log("connected.");
    clientConnected(client);
});

clientConnected = function(client)
{
	tableHasData(client);
}           


tableHasData = function(client)
{
    client.query(
        'SELECT * FROM db.table LIMIT 0,10',
        function selectCb(err, results, fields) {
            if (err) {
                console.log("ERROR: " + err.message);
                throw err;
            }
            console.log("Got "+results.length+" Rows:");
            for(var i in results){
			 
				// console.log(results[i].[column name]); 
				console.log('\n');
				
            //console.log("The meta data about the columns:");
            //console.log(fields);     
			}
            client.end();
        });
};