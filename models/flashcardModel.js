const mongoose = require('mongoose');
const {Schema} = mongoose;

const date = Date.now()

const flashcardSchema = new Schema({
    original: String,
    translation: String,
    repetition: {type: Number, default: 2},
    createAt: {type: Date, default: date},
    category: {type: String, default: 'Default'},
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('flashcards', flashcardSchema);
