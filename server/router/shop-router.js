import Router from "express"
import ShopController from "../controllers/shop-controller.js"

const shopRouter = new Router()

shopRouter.get('/', ShopController.getShops)

export default shopRouter