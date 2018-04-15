const mongoose = require('mongoose');
const {Schema} = mongoose;
const flashcardModel = require('./flashcardModel');
const userSchema = new Schema({
    username: String,
    googleId: String,
    category: {type: Array, default: 'Default'}
});

mongoose.model('users', userSchema);
