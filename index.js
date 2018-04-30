const express = require('express');
// require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
require('./models/userModels');
require('./models/flashcardModel');

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 *60 * 1000, //30 days
        keys: [keys.cookie]
    })
);
app.use(passport.initialize());
app.use(passport.session());




require('./services/passport');//require passport instance
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/flashcardsRoutes')(app);


// mongoose.connect(keys.mongoDB)
mongoose.connect('mongodb://sebekgr:flash@ds135866.mlab.com:35866/flashcards-production');


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);