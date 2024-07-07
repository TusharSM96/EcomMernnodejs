const express = require("express");
const { Add_order, find_order_count, get_orderdetails, update_delivery_status, user_order_details } = require("../Controller/OrderControler");
const { requireMidlware } = require("../Middleware/authMiddleware");
const orderroute = express.Router();
orderroute.post("/add_order", requireMidlware, Add_order);
orderroute.post('/update_delivery_status',requireMidlware,update_delivery_status)
orderroute.post("/get_orderdetails",requireMidlware, get_orderdetails);
orderroute.get("/find_order_count", requireMidlware, find_order_count);
orderroute.post("/user_order_details", requireMidlware, user_order_details);
module.exports = orderroute;
