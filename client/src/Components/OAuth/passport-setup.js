const passport = require('passport');
const GoogleStrategy = require('passport-google-oath20');
const Keys = require('./keys');

passport.use(
    new GoogleStrategy({
        // options for the google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }), () => {
        // passport callback function
    }
);
