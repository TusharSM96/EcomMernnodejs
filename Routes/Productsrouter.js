const express = require("express");
const prodrouter = express.Router();
const multer = require("multer");
const Storage = multer.memoryStorage();
const Upload = multer({ storage: Storage });
const {
  get_allCategory,
  delete_category,
  getSingle_category,
  insertupdate_category,
} = require("../Controller/CategorieController");
const {
  getall_products,
  single_product,
  delete_product,
  UpdateInsertProduct,
  filterCatwise_product,
  similer_product
} = require("../Controller/Productcontroler");
const { requireMidlware } = require("../Middleware/authMiddleware");
prodrouter.post("/getall_category", get_allCategory);
prodrouter.post("/delete_category", requireMidlware, delete_category);
prodrouter.post("/getSingle_category", getSingle_category);
prodrouter.post(
  "/insertupdate_category",
  requireMidlware,
  insertupdate_category
);
///product routes
prodrouter.post("/getall_products", getall_products);
prodrouter.post("/delete_product", requireMidlware, delete_product);
prodrouter.post("/updateinsert_product", requireMidlware, Upload.single("ProductImage"), UpdateInsertProduct);
prodrouter.post("/single_product", single_product);
prodrouter.post("/filterCatwise_product", filterCatwise_product);
prodrouter.post("/similer_product", similer_product);
module.exports = prodrouter;
