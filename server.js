const http = require('http'),
 https = require('https'),
 express = require('express'),
 fs = require('fs'),
 path = require('path'),
 logger = require('morgan'),
 bodyParser = require('body-parser'),
 cors = require('cors'),
 app = express(),
 mongoose = require('mongoose'),
 auth = require('./server/api/v1/providers/auth')();

/*
Routes & Config
*/
const routes = require('./server/config/routes'),
 config = require('./server/config/config');
/*
Settings
*/
const key = fs.readFileSync('encryption/private.key'),
 cert = fs.readFileSync('encryption/mydomain.crt'),
 ca = fs.readFileSync('encryption/mydomain.crt');
var httpsOptions = {
    key: key,
    cert: cert,
    ca: ca
};
const server = https.Server(httpsOptions, app),
 hostName = 'localhost',
 port = '8080',
 nodeEnv = (process.env.NODE_ENV)?process.env.NODE_ENV:'development';
if(nodeEnv !== 'production') {
    console.log('Do some development stuff!');
}

/*
Mongoose (MongoDb-port)
*/
const mongoDbConnectionString = config.database.connectionString;
mongoose.connect(mongoDbConnectionString);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDb Cconnection error!'));

/*
Cors
*/
var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

/*
Passport via passport.js provider
*/
app.use(auth.initialize());

/*
Express.js settings
*/
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('', routes);
app.use((req, res, next) => {
    const err = new Error('Not Found!');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

/*
Launch server
*/
server.listen(port, hostName, () => {
    console.log(`Node server running at https://${hostName}:${port}/!`)
});