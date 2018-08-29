var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

 // Instantiate the HTTP server
var httpServer = http.createServer(function(req,res){
  // Parse the url
  var parsedUrl = url.parse(req.url, true);

  // Get the path
  var path = parsedUrl.pathname;
  console.log(path);
  var trimmedPath = path.substring(path.indexOf("/") + 1);
  // Get the query string as an object
  var queryStringObject = parsedUrl.query;

  // Get the HTTP method
  var method = req.method.toLowerCase();

  //Get the headers as an object
  var headers = req.headers;

  // Get the payload,if any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data', function(data) {
      buffer += decoder.write(data);
  });
  req.on('end', function() {
      buffer += decoder.end();
      var data = {
        'trimmedPath' : trimmedPath,
        'queryStringObject' : queryStringObject,
        'method' : method,
        'headers' : headers,
        'payload' :  buffer
      };
      var chosenHandler = router[trimmedPath];
      chosenHandler(data, function(statusCode,payload) {
        var payloadString = JSON.stringify(payload);
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);
      });
     
  });
});
 
// Start the HTTP server
httpServer.listen(3000,function(){
    console.log('The HTTP server is running on port 3000');
});
 

 
var handlers = {};
// Customers
handlers.customers = function(data,callback){
    var acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        customers[data.method](data,callback);
    } else {
      callback(405);
    }
};

var customers = {};
customers.get  = function(data, callback) {
   var id = data.queryStringObject.id;
  
};

// Ping
handlers.ping = function(data,callback){
    callback(200);
};


// Ping
handlers.notFound = function(data,callback){
    callback(404);
};

var router = {
    'customers' : handlers.customers,
    'ping' : handlers.ping
};
