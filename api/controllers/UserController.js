/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const User = require('../models/User');


module.exports = {
    async signUp(req, res) {
        // get the user details
        const data = req.body;
        // check if password is more than 7 chars in length
        if ((data.password).length <= 7) return res.badRequest("Password must be more than 8 characters");

        // create user
        await User.create({
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

    async login(req, res) {
        const data = req.body;

        // check if the user supplied both email and password for login
        if (!data.email || !data.password) return res.badRequest('Email and password required');

            const log_user = await User.find({where: {email: data.email}}).limit(1)
            .populate('role')
            console.log(log_user)

            if(log_user){
                // compare user supplied password with the encrypted one in db
                var passwordIsValid = bcrypt.compareSync(
                    data.password,
                    log_user[0].password
                );
                
                // validate password
                if(!passwordIsValid) {
                    res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password"
                    })
                }

                // generates user token
                var new_token = jwt.sign({id: log_user[0].id}, "timothy-secrets", {
                    expiresIn: "12h" //24hours
                })

                // update user token
                await User.update({id: log_user[0].id}).set({token: new_token})

                console.log("Logged in successfully")
                res.cookie('auth', new_token).json({
                    message: "Logged in successfully",
                    id: log_user[0].id,
                    username: log_user[0].username,
                    email: log_user[0].email,
                    role: log_user[0].role,
                    accessToken: new_token
                })
            }else{
                res.status(400).json({
                    message: "User not found"
                })
            }
    },

    // logout
    logout(req, res){
        req.user.deleteToken(req.token, (err, user)=>{
            if(err){
                res.status(400).json({error: err})
            }
            res.status(200).json({
                message: "Logged out successfully"
            })
        })
    }
};

