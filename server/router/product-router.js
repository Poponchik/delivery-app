import Router from "express"
import ProductController from "../controllers/product-controller.js"

const productRouter = new Router()

productRouter.get('/:shop', ProductController.getProductsFromShop)


export default productRouter
