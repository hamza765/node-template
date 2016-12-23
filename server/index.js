import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';

var app = express();
app.server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');
// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.send('hi')
});

app.use(express.static('./client'));

// internal middleware
app.use(middleware());

// api router
app.use('/api', api());

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res) {
    res.redirect(301, '/404');
});


app.server.listen(process.env.PORT || 8080);

console.log(`Started on port ${app.server.address().port}`);

export default app;
