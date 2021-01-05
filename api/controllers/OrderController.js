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

    async createOrder(req, res){
        const food = await Food.find({where: {id: req.param.food_id}}).limit('1')
        console.log(food)
        if(food.length == 0){
            res.status(400).json({
                message: "Food item does not exist"
            })
        }else{
            var createdOrder = await Order.create({
                status: req.param('status'),
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
    

    async updateOrderStatus(req, res){
        const order = await Order.find({where: {id: req.param.id}}).limit('1')
        if(order.length == 0){
            res.status(400).json({
                message: "Order item does not exist"
            })
        }else{
            var updatedOrder = await Order.update({
                id: req.params.id
            }).set({status: req.param('status')})
            .fetch();

            if(updatedOrder){
                return res.status(200).json({
                    message: "Order updated successfully",
                    payload: updatedOrder
                })
            }else{
                res.status(400).json({
                    message: "Unable to unable Order"
                })
            }
        
        }

    }

};

