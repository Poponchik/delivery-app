import Order from '../models/Order.js'

class OrderController {
    async createOrder(req, res) {
        const order = new Order(req.body)
        order.created = new Date().toISOString()
        await order.save()
        res.json('created')
    }
    async getOrderHistory(req, res){
        console.log(req.user)
        const history = await Order.find({'user.email': req.user.email}).sort({created:-1}).populate({path: 'items.product', populate: {path: "shop"}})
        
        res.json(history)
    }
}



export default new OrderController()