import mongoose from "mongoose";

const Order = new mongoose.Schema({
    created: {
        type: Date, required: true
    },
    sum: {
        type: Number, required: true
    },
    user: { 
        name: {type: String, required: true},
        phone: {type: String, required: true},
        email: {type: String, required: true},
        address: {type: String, required: true}
    },
    items: [
        {
            product: {type: mongoose.Types.ObjectId, ref: 'Product', required: true},
            quantity: {type: Number, required: true}

        }
    ]
})

export default mongoose.model('Order', Order)