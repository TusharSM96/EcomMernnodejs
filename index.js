const express =require('express')
require('dotenv').config();
const api=express()
const cors = require('cors');
const AuthRoutes=require('./Routes/Authrouter');
const prodrouter = require('./Routes/Productsrouter');
const orderroute = require('./Routes/OrderRotes');
require('./Connection/mongoconnection')
api.use(cors())
api.use(express.json())
api.use(express.urlencoded({extended:true}))
api.get('/',(req,resp)=>{
    resp.send("hellow World")
})
api.use('/api/auth',AuthRoutes)
api.use('/api/product',prodrouter)
api.use('/api/order',orderroute)
api.listen(process.env.PORT)

//test