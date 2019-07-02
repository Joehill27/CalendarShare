const passport = require('passport');
const GoogleStrategy = require('passport-google-oath20');
const Keys = require('./keys');

passport.use(
    new GoogleStrategy({
        // options for the google strategy
        clientID: keys.clientID,
        clientSecret: keys.clientSecret
    }), () => {
        // passport callback function
    }
);
