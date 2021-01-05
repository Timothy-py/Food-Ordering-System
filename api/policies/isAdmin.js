// const User = require('../models/User');

module.exports = (req, res, next) => {
    User.find({where: {id: req.userId}}).limit(1)
    .populate('role')
    .then(user => {
        if(user[0].role.title === 'admin'){
            req.user = user[0];
            req.user.token = req.token
            next()
            return;
        }else{
            res.status(403).send({message: "Unauthorized: Only admin can view this resource"})
        }
    })
}