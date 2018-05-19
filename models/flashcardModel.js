const mongoose = require('mongoose');
const {Schema} = mongoose;

const date = new Date()

const flashcardSchema = new Schema({
    original: String,
    translation: String,
    repetition: {type: Number, default: 2},
    createAt: {type: Number, default: date.getTime()},
    modifyAt: {type: Number, default: date.getTime()},
    category: {type: String, default: 'Default'},
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('flashcards', flashcardSchema);
