const userModule = require("../Models/userModels");
const OrderModule = require("../Models/OrderModule");
const moment = require("moment");
const Add_order = async (req, res) => {
  try {
    const { email, orderDetails, totalBill, Address } = req.body;
    if (!email) {
      return res.status(400).send({ code: 200, Msg: "email is required" });
    }
    if (!totalBill) {
      return res.status(400).send({ code: 200, Msg: "totalBill is required" });
    }
    if (!Address) {
      return res.status(400).send({ code: 200, Msg: "Address is required" });
    }
    if (!orderDetails) {
      return res
        .status(400)
        .send({ code: 200, Msg: "orderDetails is required" });
    }
    if (orderDetails?.length == 0) {
      return res.status(400).send({ code: 200, Msg: "Plases add product" });
    }
    const findUser = await userModule.find({ email: email });
    if (findUser?.length == 0) {
      return res.status(400).send({ code: 200, Msg: "Email is not Register" });
    }
    const BindData = new OrderModule({
      email: email,
      userId: findUser[0]?._id,
      status: "Ordered",
      orderDetails: orderDetails,
      totalBill: totalBill,
      Address: Address,
      userDetails: {
        name: findUser[0]?.name,
        phone: findUser[0]?.phone,
      },
    });
    const saveData = await BindData.save();
    if (saveData) {
      return res.send({ code: 200, Msg: "Order Successfully" });
    }
  } catch (error) {
    return res.send({ code: 400, Msg: "Error Geting on Adding Order", error });
  }
};
const find_order_count = async (req, res) => {
  try {
    const TotalCount = await OrderModule.find({});
    const Deliverd = await OrderModule?.find({ status: "Delivered" });
    const Shipping = await OrderModule?.find({ status: "Shipping" });
    const OutForDelivery = await OrderModule?.find({
      status: "Out for Delivered",
    });
    return res.status(200).send({
      code: 200,
      count: TotalCount?.length,
      lastUpdate: TotalCount?.length
        ? moment(TotalCount?.slice(-1)[0]?.createdAt).format(
            "DD-MMM-YYYY HH:MM:SS"
          )
        : "",
      Deliverd: Deliverd?.length,
      LastDeliverd: Deliverd?.length
        ? moment(Deliverd?.slice(-1)?.[0]?.updatedAt).format(
            "DD-MMM-YYYY HH:MM:SS"
          )
        : "",
      Shipping: Shipping?.length,
      LastShipping: Shipping?.length
        ? moment(Shipping?.slice(-1)?.[0]?.updatedAt).format(
            "DD-MMM-YYYY HH:MM:SS"
          )
        : "",
      OutForDelivery: OutForDelivery?.length,
      LastOutForDelivery: OutForDelivery?.length
        ? moment(OutForDelivery?.slice(-1)?.[0]?.updatedAt).format(
            "DD-MMM-YYYY HH:MM:SS"
          )
        : "",
    });
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, Msg: "Getting Error On OrderDetails", error });
  }
};

const get_orderdetails = async (req, res) => {
  try {
    const { OrderCatgory } = req.body;
    if (!OrderCatgory)
      return res
        .status(400)
        .send({ code: 400, Msg: "OrderCatgory is required" });
    if (OrderCatgory === "totalorder") {
      const Findtotalorder = await OrderModule.find({});
      return res.status(200).send({ code: 200, data: Findtotalorder });
    }
    if (OrderCatgory === "Shipping") {
      const FindShippingorder = await OrderModule.find({ status: "Shipping" });
      return res.status(200).send({ code: 200, data: FindShippingorder });
    }
    if (OrderCatgory === "Out for Delivered") {
      const FindShippingorder = await OrderModule.find({
        status: "Out for Delivered",
      });
      return res.status(200).send({ code: 200, data: FindShippingorder });
    }
    if (OrderCatgory === "Delivered") {
      const FindShippingorder = await OrderModule.find({ status: "Delivered" });
      return res.status(200).send({ code: 200, data: FindShippingorder });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, Msg: "Getting Error On OrderDetails", error });
  }
};

const update_delivery_status = async (req, res) => {
  try {
    const { deliveryId, deliveryStatus } = req.body;
    if (!deliveryId) {
      return res.status(400).send({ code: 400, Msg: "deliveryId is required" });
    }
    if (!deliveryStatus) {
      return res
        .status(400)
        .send({ code: 400, Msg: "deliveryStatus is required" });
    }
    const UpdateStatus = await OrderModule?.findByIdAndUpdate(deliveryId, {
      $set: { status: deliveryStatus },
    });
    if (UpdateStatus) {
      return res
        .status(200)
        .send({ code: 200, status: "Record Update successfully" });
    } else {
      return res.status(400).send({ code: 200, status: "Record Not  Found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, Msg: "Getting Error On OrderDetails", error });
  }
};

const user_order_details = async (req, res) => {
  try {
    const { Mailaddress } = req.body;
    if (!Mailaddress) {
      return res.status(400).send({ code: 400, Msg: "Mailaddress is required" });
    }
    const FindData=await OrderModule.find({email:Mailaddress})
    return res.status(200).send({code:200,data:FindData})
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, Msg: "Getting Error On OrderDetails", error });
  }
};

module.exports = {
  Add_order,
  find_order_count,
  get_orderdetails,
  update_delivery_status,
  user_order_details,
};
