import Shop from "../models/Shop.js";

class ShopController{
    async getShops(req, res) {
        const shops = await Shop.find({})
        res.json(shops)
    }
}

export default new ShopController()