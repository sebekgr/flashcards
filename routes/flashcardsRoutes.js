const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Flashcard = mongoose.model('flashcards')
module.exports = app => {

    //get list of flashcards

    app.get('/api/flashcards/:user', requireLogin, async (req, res) => {
        
        const flashcard = await Flashcard.find({_user: req.params.user}).select('-__v -_user');
        res.send(flashcard).status(200);

    })


    //add flashcard

    app.post('/api/flashcards/add', requireLogin, async (req, res) => {
        const {original, translation, category, userId} = req.body;
    
        const flashcard = await new Flashcard({
            original,
            translation,
            category,
            _user: userId
        }).save();
        res.send(flashcard._id).status(200);
       
    })

    //edit flashcard
    app.patch('/api/flashcards/:flashcard', requireLogin, async (req, res) => {
        const {original, translation, category} = req.body;
        console.log(req.body);
        try {
            const flashcard = await Flashcard.findByIdAndUpdate({_id: req.params.flashcard}, {original, translation, category}, { "new": true});
            res.send(flashcard).status(200);
        } catch(err){
            res.send(err).status(500);
        }
    
    })

    //update status of flashcard
    app.put('/api/flashcards/:flashcard/status', requireLogin, async (req, res) => {
        const {status} = req.body
        try {
            const flashcard = await Flashcard.findByIdAndUpdate({_id: req.params.flashcard}, {repetition: status, modifyAt: Date.now()}, {"new" : true});
            res.send(flashcard).status(200);
        }catch(err) {
            res.send(err).status(500)
        }

    })

    //remove flashcard

    app.delete('/api/flashcards/:flashcard', requireLogin, async (req, res) => {
        try {
            const flashcard = await Flashcard.findByIdAndRemove({_id: req.params.flashcard});
            res.send(flashcard).status(500);
        } catch (err) {
            res.send(err).status(500);
        }

    })

    
}