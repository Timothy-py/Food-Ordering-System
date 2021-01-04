/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    username: {type: 'string', required: true},
    email: {type: 'string', required: true},
    password: {type: 'string', required: true},
    updatedAt: false,



    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    // a one-way relationship between user and role
    role: {
      model: 'Role'
    },
    // a one-to-many relationship between user and orders
    my_orders: {
      collection: 'order',
      via: 'owner'
    }
  },


  // Function for Encrypting user password
  encryptPassword(values, next) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            sails.log.error(err);
            return next();
        }

        bcrypt.hash(values.password, salt, (err, hash) => {
            if (err) {
                sails.log.error(err);
                return next();
            }
            values.encryptedPassword = hash; // Here is our encrypted password
            return next();
        });
    });
},

// Function that compares user typed password and the one encrypted in the db
comparePassword(password, encryptedPassword) {

    return new Promise(function(resolve, reject) {
        bcrypt.compare(password, encryptedPassword, (err, match) => {
            if (err) {
                sails.log.error(err);
                return reject("Something went wrong!");
            }
            if (match) return resolve();
            else return reject("Mismatch passwords");
        });
    });
}

};

