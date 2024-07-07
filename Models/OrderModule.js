const mongoose = require("mongoose");
const OrderMongoose = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    Address: {
      type: String,
      require: true,
    },
    orderDetails: {
      type: Object,
      require: true,
    },
    userDetails: {
      type: Object,
      require: true,
    },
    totalBill:{
        type:String,
        require:true
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("orderdetails", OrderMongoose);
