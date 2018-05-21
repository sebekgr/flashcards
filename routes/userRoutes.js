const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Flashcards = mongoose.model('flashcards');

module.exports = app => {


    app.get('/api/current_user', (req, res) => {
        if(!req.user) {
            res.send('').status(200);
        } else {
            const {username, _id, category, good, notBad, bad} = req.user;
            res.send({username, _id, category, good, notBad, bad}); 
        }
        
    });

    //update repetitions settings

    app.patch('/api/:user/repetitions', requireLogin, async (req, res) => {
        const {good, notBad, bad} = req.body;
        try{

            await User.findByIdAndUpdate({_id: req.params.user}, {good, notBad, bad})
            res.send('Repetitions has been updated').status(200)

        }catch (err){
            console.log(err)
            res.send(err).status(500)
        }
    })

    //add new category
    app.put('/api/:user/add/category', requireLogin, async (req, res) => {
        const {newCategory} = req.body;
        try {
            await User.findByIdAndUpdate({_id: req.params.user}, {$push: {category: newCategory}}, {new: true})
            res.send(newCategory).status(200);
        } catch(err){
            res.send(err).status(500);
        }
    
    })

    //update category name
    app.put('/api/:user/edit/category', requireLogin, async (req, res) => {
       const {currentName, newName} = req.body;
       try {
         await User.findOneAndUpdate({_id: req.params.user, category: currentName}, {$set: {"category.$": newName}}, {new: true});
        const flashcards = await Flashcards.where({category: currentName}).setOptions({ multi: true }).update({ $set: {category: newName}}).exec();
         res.send(flashcards).status(200);
       } catch(err) {
           res.send(err).status(500);
       }    
    })

    //delete category + flashcards
    app.delete('/api/:user/delete/category/:name', requireLogin, async (req, res) => {
        try {
            await User.where({_id: req.params.user}).update({$pull: {category: req.params.name}}).exec();
            await Flashcards.deleteMany({_user: req.params.user, category: req.params.name});
            res.send('category and flashcards has been removed').status(200);
          } catch(err) {
              res.send(err).status(500);
          }     
     })

}