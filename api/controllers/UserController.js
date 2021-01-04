/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
 const tokenSecret = require('.../config/authConfig.js');


module.exports = {
    signUp(req, res) {
        // get the user details
        const data = req.body;
        // check if password is more than 7 chars in length
        if ((data.password).length <= 7) return res.badRequest("Password must be more than 8 characters");

        // create user
        User.create({
                username: data.username,
                email: data.email,
                password: bcrypt.hashSync(data.password, 8), // encrypt the password
                role: data.role
            })
            .then((user) => {
                res.status(201).json({
                    message: "User created successfully"
                })
            })
            .catch((err) => {
                sails.log.error(err);
                return res.serverError("Something went wrong");
            });
    },

    login(req, res) {
        const data = req.body;
        // check if the user supplied both email and password for login
        if (!data.email || !data.password) return res.badRequest('Email and password required');

        User.findOne({ email: email })
            .then((user) => {
                // check if the user exists
                if (!user) return res.status(400).send({message: "User Not Found."})

                // compare user supplied password with the encrypted one in db
                var passwordIsValid = bcrypt.compareSync(
                    data.password,
                    user.password
                );
                
                // validate password
                if(!passwordIsValid) {
                    res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password"
                    })
                }

                // generates user token
                var token = jwt.sign({id: user.id}, tokenSecret.secret, {
                    expiresIn: 86400 //24hours
                })

                res.status(200).send({
                    message: "Logged in successfully",
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    accessToken: token
                })
            })
            .catch((err) => {
                sails.log.error(err);
                return res.serverError();
            });
    }
};
