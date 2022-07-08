import Product from '../models/Product.js'

class ProductController {
    async getProductsFromShop(req, res) {
        const {shop} = req.params
        const products = await Product.find({shop}).populate('shop')
        res.json(products)
    }
}

export default new ProductController()


