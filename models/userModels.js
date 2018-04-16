const mongoose = require('mongoose');
const {Schema} = mongoose;
const flashcardModel = require('./flashcardModel');
const userSchema = new Schema({
    username: String,
    googleId: String,
    category: {type: Array, default: 'Default'},
    good: {type: String, default: '1 month'},
    notBad: {type: String, default: '1 week'},
    bad: {type: String, default: '1 day'}
});

mongoose.model('users', userSchema);
