const express = require("express");
const routes = express.Router();
const {
  registerController,
  LoginuserController,
  forgetPassword,
} = require("../Controller/authController");
const { requireMidlware } = require("../Middleware/authMiddleware");
routes.post("/adduser", registerController);
routes.post("/loginuser", LoginuserController);
routes.post("/forgetPassword", forgetPassword);
routes.post("/middletest", requireMidlware, (req, res) => {
  res.send({ Msg: "From Main ROute Massage" });
});
module.exports = routes;
