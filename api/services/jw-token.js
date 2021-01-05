const jwt = require('jsonwebtoken');


module.exports = {

  // Verifies token on a request
  verify(token, callback) {
    return jwt.verify(
      token, // The token to be verified
      "timothy-secrets", // Same token we used to sign
      {}, 
      callback //Pass errors or decoded token to callback
    );
  }

};

