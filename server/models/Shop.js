import mongoose from "mongoose";


const Shop = new mongoose.Schema({
    name: { type: String, required: true, unique: true}
})

export default mongoose.model('Shop', Shop)