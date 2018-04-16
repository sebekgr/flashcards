const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const User = mongoose.model('users')

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
        console.log(req.body);
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

}