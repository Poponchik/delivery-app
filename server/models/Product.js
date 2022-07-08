import mongoose from "mongoose";



const Product = new mongoose.Schema({
    photo: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    shop: { type: mongoose.Types.ObjectId, ref: 'Shop', required: true}
})

export default mongoose.model('Product', Product)