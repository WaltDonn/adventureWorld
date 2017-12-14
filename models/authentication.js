var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var mongoModel = require("../models/mongoModel.js")
const {ObjectId} = require('mongodb'); // or ObjectID 
// or var ObjectId = require('mongodb').ObjectId if node version < 6
const safeObjectId = s => ObjectId.isValid(s) ? new ObjectId(s) : null;
/*
 * Initialize the use of Passport in this app
 * @param {Express} app - The Express app this is associated with
 * @returns {Passport} passport - The Passport object for this app.
 */


exports.init = function (app) {
  // If you are using sessions, or Passport sessions, include the middleware
  // For more info: https://github.com/expressjs/session
  app.use(expressSession((
    {secret: 'Tartans', // Sessions will be "signed" to prevent tampering
     resave: false,     // Don't resave session if not saved
     saveUninitialized: true }))); // Save uninitialized session
  // Initialize Passport
  app.use(passport.initialize());
  // Include middleware for Passport sessions.
  app.use(passport.session());
  // Return the Passport object configured here.
  return passport;
}

/* 
 * Define the strategy used by Passport.  In this case Local Strategy
 * The local strategy requires a "verify" function which receives the
 * credentials (username and password) submitted by the user.  The function
 * must verify that the password is correct and then invoke the "done"
 * callback function with a user object. This object will be available as
 * req.user after authentication.
 *
 * You should probably not need to change this boilerplate to use Local 
 * Strategy.  If you choose to use another strategy (e.g. Twitter, Facebook) 
 * then you will need to change this.
 */

passport.use(new Strategy(
  function(username, password, done) {
    query = { name : username, password : password};
    mongoModel.retrieve('Character', query, function(modelData) {
    
      if (modelData.length) {
        
        return done(null, modelData[0]);
      }
      else
     { return done(null, false); }
    });
  }));


/*
 * Define Passport authenticated session persistence.
 * Passport sessions will restore authentication state and user information
 * across HTTP requests.  It does this by using HTTP header cookies.
 * To support this, Passport needs to serialize the user information into
 * the cookie. And on the next request, deserialize the user from the cookie.
 * The easiest way to do this is to simply supply the user ID when serializing
 * and querying the user record by ID from the database when deserializing.
 * Upon deserialization, Passport will put the user in req.user.
 */

/* 
 * Serialize the users
 * @param {function} anonymous - the serializing function for Passport to users
 * and for the anonymous function
 * @param {object} user - the user object for the currently logged-in users
 * @param {function} done - callback function to pass the object to include
 *  in the cookie.  This object must be sufficient to look up the user object
 *  on the next request.
 */
passport.serializeUser(function(user, done) {
  // Pass null for no error, and the user ID as a key to lookup the user
  // upon deserialization.
  done(null, user._id);
});

/* 
 * Deserialize the users
 * @param {function} anonymous - the serializing function for Passport to users
 * and for the anonymous function
 * @param {number} id - the id of the user associated with this request
 * @param {function} done - callback function to pass the user object to
 *   Passport.  Passport will put the foundUser object onto req as req.user.
 */
passport.deserializeUser(function(id, done) {
  query = { _id : safeObjectId(id) };
  mongoModel.retrieve('Character', query, function(modelData) {
    // pass back err (if any) and the user object associated with this ID
    done(null, modelData[0]);
  });
});



