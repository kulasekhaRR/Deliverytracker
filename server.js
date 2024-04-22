require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')(session); // Import connect-mongo and pass session to it

const url = 'mongodb+srv://bt21cse136:PYas2vvqdTRpdIQm@cluster2.vtoz8rd.mongodb.net/pizza?retryWrites=true&w=majority&appName=Cluster2';
mongoose.connect(url);
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('congo.....Database Connected.....');
});

connection.on('error', (err) => {
    console.error('Connection error:', err);
});

const mongoStore = new MongoDbStore({ // Correct usage: instantiate MongoDbStore with new
    mongooseConnection: connection,
    collection: 'sessions'
});

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(flash());

app.use(express.static('public'));
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');
require('./routes/web')(app);
//require('./resources/js/app')(app);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
