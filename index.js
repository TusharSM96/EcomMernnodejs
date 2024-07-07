const express =require('express')
const api=express()
const cors = require('cors');
const dotenv=require('dotenv')
const AuthRoutes=require('./Routes/Authrouter');
const prodrouter = require('./Routes/Productsrouter');
const orderroute = require('./Routes/OrderRotes');
require('./Connection/mongoconnection')
dotenv.config()
api.use(cors())
api.use(express.json())
api.use(express.urlencoded({extended:true}))
api.use('/api/auth',AuthRoutes)
api.use('/api/product',prodrouter)
api.use('/api/order',orderroute)
api.listen(process.env.PORT)