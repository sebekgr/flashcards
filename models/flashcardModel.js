const mongoose = require('mongoose');
const {Schema} = mongoose;

const flashcardSchema = new Schema({
    original: String,
    translation: String,
    repetition: {type: Number, default: 2},
    createAt: Number,
    modifyAt: {type: Number, default: 0},
    category: {type: String, default: 'Default'},
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('flashcards', flashcardSchema);
