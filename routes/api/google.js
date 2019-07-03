const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

router.get('/google', (req, res) => 
{
    var temp = passport.authenticate('/google', 
    {
        scope: ['profile']
    });

    if(temp != null)
    {
        res.send(passport.authenticate('/google', {
            scope: ['profile']
        }));
    } else {
        res.send('errrrrrror');
    }
});

module.exports = router;
