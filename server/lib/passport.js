const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      console.log('validate: ', username, password);
      // Match user
      User.findOne({
        username
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'This user is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );
  // passport.use(new LocalStrategy({ usernameField: 'uname' },
  //   function(username, password, done) {
  //     User.findOne({ uname: username }, function(err, user) {
  //       if (err) { return done(err); }
  //       if (!user) {
  //         return done(null, false, { message: 'Incorrect username.' });
  //       }
  //       if (!user.validPassword(password)) {
  //         return done(null, false, { message: 'Incorrect password.' });
  //       }
  //       return done(null, user);
  //     });
  //   }
  // ));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  // passport.serializeUser(function(user, done) {
  //   done(null, user.id);
  // });

  // passport.deserializeUser(function(id, done) {
  //   User.findById(id, function(err, user) {
  //     done(err, user);
  //   });
  // });
};