
var app = require('express')(),
 http = require('http').Server(app),
 port = process.env.PORT || 4000,
 bodyParser = require('body-parser'),
 cors = require('cors');

app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data

app.use(cors({
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

var routes = require('./api/routes/routes');
routes(app);

http.listen(port, function(){
    console.log('Connected & Listen to port ' + port);
});
