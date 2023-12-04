const {Strategy} = require("passport-google-oauth2");
const passport = require("passport");
const {nanoid} = require("nanoid");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL} = process.env;

const googleParams = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${BASE_URL}/api/users/google/callback`,
    passReqCallback: true,
}

const googleCallback = async(req, accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile);
        const { email, displayName } = profile;
        console.log("User model:", User)
        const user = await User.findOne({email});
        if(user) {
           return done(null, user); // req.user = user;
        }
        const password = nanoid();
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({email, name: displayName, password: hashPassword, avatarURL: process.env.AVATAR_DEFAULT_URL});
        done(null, newUser);
    } 
    catch(error) {
        done(error, false)
    }
}

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;