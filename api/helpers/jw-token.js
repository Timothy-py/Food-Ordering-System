const jwt = require('jsonwebtoken');
const tokenSecret = require('.../config/authConfig.js');


module.exports = {

  // Verifies token on a request
  verify(token, callback) {
    return jwt.verify(
      token, // The token to be verified
      tokenSecret.secret, // Same token we used to sign
      {}, 
      callback //Pass errors or decoded token to callback
    );
  }

};

