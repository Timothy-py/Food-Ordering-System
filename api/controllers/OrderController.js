/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const Order = require("../models/Order");

module.exports = {
    
    viewAllOrders(req, res){
        Order.find()
        .then(orders => {
            
            if(orders.length > 0){
                return res.status(200).json({
                    message: `${orders.length} Orders Found`,
                    payload: orders
                })
            }else{
                res.status(200).send("No Product Found")
            }
        })
        .catch(err => {
            res.status(400).json({
                message: "Unable to search for product",
                Error: err
            })
        })
    },
    viewMyOrders(req, res){
        res.send("VIEW MY ORDERS BY SELF USER")
    },

    async createOrder(req, res){
        const food = await Food.find({where: {id: req.param.food_id}}).limit('1')
        console.log(food)
        if(food.length == 0){
            res.status(400).json({
                message: "Food item does not exist"
            })
        }else{
            var createdOrder = await Order.create({
                status: req.param('name'),
                quantity: req.param('quantity'),
                ordered_by: req.param('food_id'),
                owner: req.userId,
            }).fetch();

            if(createdOrder){
                return res.status(201).json({
                    message: "Order created successfully",
                    payload: createdOrder
                })
            }else{
                res.status(400).json({
                    message: "Unable to create Order"
                })
            }
        
        }

        
    },
    updateOrderStatus(req, res){
        res.send("UPDATE ORDER STATUS BY SELF USER")
    }

};

