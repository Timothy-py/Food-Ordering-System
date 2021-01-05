/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const Order = require("../models/Order");

module.exports = {
    
    // viewOrders(req, res){
    //     Order.find()
    //         .populate('owner')
    //         .populate('ordered_by')
    // }
    viewAllOrders(req, res){
        console.log(req.user)
        console.log(req.token)
        res.status(200).json({
            message: "VIEW ALL ORDERS BY ADMIN",
            // username: req.user.username
        })
    },
    viewMyOrders(req, res){
        res.send("VIEW MY ORDERS BY SELF USER")
    },
    createOrder(req, res){
        res.send("CREATE ORDERS BY ALL USERS")
    },
    updateOrderStatus(req, res){
        res.send("UPDATE ORDER STATUS BY SELF USER")
    }

};

