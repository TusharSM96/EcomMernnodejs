const mongoose = require("mongoose");
const OrderMongoose = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    orderDetails: {
      type: Object,
      required: true,
    },
    userDetails: {
      type: Object,
      required: true,
    },
    totalBill:{
        type:String,
        required:true
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("orderdetails", OrderMongoose);
