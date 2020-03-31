const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

const User = mongoose.model("users");

/* Passport service ************************************* */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          console.log("User has already existed!");
          cb(null, existingUser);
        } else {
          new User({
            googleId: profile.id,
            name: profile.displayName
          })
            .save()
            .then(user => {
              console.log("A new user is created and saved to DB!");
              cb(null, user);
            });
        }
      });
    }
  )
);
