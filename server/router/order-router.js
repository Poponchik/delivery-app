import Router from "express"
import OrderController from "../controllers/order-controller.js"
import authMiddleware from '../middlewares/auth-middleware.js'


const orderRouter = new Router()

orderRouter.post('/', OrderController.createOrder)
orderRouter.get('/history', authMiddleware, OrderController.getOrderHistory)

export default orderRouter