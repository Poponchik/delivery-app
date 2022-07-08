import 'dotenv/config'
import express from "express"
import mongoose from "mongoose"
import authRouter from "./router/auth-router.js"
import cors from 'cors'
import productRouter from './router/product-router.js'
import Order from './models/Order.js'
import Shop from './models/Shop.js'
import shopRouter from './router/shop-router.js'
import orderRouter from './router/order-router.js'
import path from 'path'



const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({
    credentials: true,                                 // разрешаем кукки
    origin: true                                      // URL нашего фронтенда
}))
app.use(express.json())

// app.use(fileUpload({}))
app.use('/auth', authRouter)
app.use('/products', productRouter)
app.use('/shops' , shopRouter)
app.use('/orders', orderRouter)

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `*`);
    next();
})

// app.use(express.static('public')); 
app.use(express.static('./public'));

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server working, PORT: ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start()
























