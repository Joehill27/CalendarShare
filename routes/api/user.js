const express = require('express');
const router = express.Router();
const User = require('../../models/User');

//Copied over user info from contact manager, TODO make any updates

//Checks if a user exists by username, if they do checks password
router.post('/login', (req, res) => {
    let name = req.body.username;
    let password = req.body.password;
    User.findOne({username: name}).select('-contacts -email -__v').exec(function(err, user) {
    if(!user) {
        res.status(404).send({error : "user does not exist"});
    } else{
        res.status(200).send({'user': user});
    }
    });
});

router.get('/get', (req, res) => {
    let name = req.body.username;
    console.log("22");
    console.log(name);
    User.findOne({username: name}).exec(function(err, user) {
        if(!user) {
            res.status(404).send({error : "user does not exist"});
        } else {
            res.status(200).send({'user': user});
        }
    })
});

//Creates an account with given info
router.post('/createAccount', (req, res) => {
    let username = req.body.username;

    User.findOne({'username': username}).exec(function(err, user) {
        if(!user) {
            let newUser = new User(req.body);
            newUser.save()
            .then(newUser => {
                res.status(200).send({'user': newUser, 'error' : ''});
            })
        } else {
            res.status(400).send({'error': "Account with that username already exists"});
        }
    });
});

//Deletes a user by id
router.delete('/deleteAccount/:userId', (req, res) => {
    let userId = req.params.usedId;

    User.findOneAndDelete({id: userId}, function(err, user) {
        if(!user) {
            res.status(404).send({error: 'user not found' + err});
        }
        else {
            res.status(200).send({'user': user});
        }
    })
});

module.exports = router;