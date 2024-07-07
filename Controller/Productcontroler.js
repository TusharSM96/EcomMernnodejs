const ProductModal = require("../Models/ProductModel");

const getall_products = async (req, res) => {
  try {
    const GetData = await ProductModal.find({}).sort({ updatedAt: -1 });
    // .select("-ProductImage")
    res.send({ code: 200, data: GetData });
  } catch (error) {
    return res.send({
      code: 400,
      Msg: "Error Geting on Getting Products list",
    });
  }
};
const delete_product = async (req, res) => {
  const { ProductId } = req.body;
  if (!ProductId) {
    return res.send({ code: 200, Msg: "ProductId is Required" });
  }
  const FindandDelete = await ProductModal.findByIdAndDelete({
    _id: ProductId,
  });
  if (FindandDelete != null) {
    return res.send({ code: 200, Msg: "Product Delete Successfully" });
  } else {
    return res.send({ code: 400, Msg: "Product Not Found" });
  }
};

const UpdateInsertProduct = async (req, res) => {
  const {
    Prodname,
    ProPrice,
    Discription,
    Category,
    Brand,
    Quntity,
    ProductId,
  } = req.body;
  const fileData = req.file;
  try {
    if (!Prodname) {
      return res.send({ code: 400, Msg: "Prodname is Required" });
    }
    if (!Brand) {
      return res.send({ code: 400, Msg: "Brand is Required" });
    }
    if (!Category) {
      return res.send({ code: 400, Msg: "Category is Required" });
    }
    if (!ProPrice) {
      return res.send({ code: 400, Msg: "ProPrice is Required" });
    }
    if (!Quntity) {
      return res.send({ code: 400, Msg: "Quntity is Required" });
    }
    if (!Discription) {
      return res.send({ code: 400, Msg: "Discription is Required" });
    }
    if (fileData?.size >= 100000) {
      return res.send({
        code: 400,
        Msg: "File size less then 5mb",
      });
    }
    if (ProductId == "null") {
      const FindProduct = await ProductModal.find({
        Prodname: Prodname.toUpperCase(),
      });
      if (FindProduct?.length != 0) {
        return res.send({
          code: 400,
          Msg: "Product is Already Exist",
        });
      }
      if (FindProduct?.length == 0) {
        const ImageData = {
          originalname: fileData.originalname,
          mimetype: fileData.mimetype,
          size: fileData.size,
          buffer: fileData.buffer,
        };
        const BindData = new ProductModal({
          Prodname: Prodname.toUpperCase(),
          ProPrice: Number(ProPrice) || 0,
          Discription,
          Category,
          Brand,
          Quntity: Number(Quntity) || 0,
          ProductImage: ImageData,
        });
        const saveData = await BindData.save();
        res.send({ code: 200, Msg: "Product Added Successfully" });
      }
    } else {
      const FindProdata = await ProductModal.findById({ _id: ProductId });
      if (!FindProdata) {
        return res.send({ code: 400, Msg: "product Not Found" });
      }
      const UpdateData = await ProductModal.findByIdAndUpdate(
        { _id: ProductId },
        {
          Prodname: Prodname.toUpperCase(),
          ProPrice: Number(ProPrice) || 0,
          Discription,
          Category,
          Brand,
          Quntity: Number(Quntity) || 0,
          ProductImage: fileData,
        }
      );
      if (!UpdateData) {
        return res.send({ code: 400, Msg: "Error on Updating Recored" });
      } else {
        return res.send({ code: 200, Msg: "Record Update Successfully" });
      }
    }
  } catch (error) {
    return res.send({ code: 400, Msg: "Error Geting on Add Products", error });
  }
};

const single_product = async (req, res) => {
  try {
    const { ProductId } = req.body;
    if (!ProductId) {
      return res.send({ code: 400, Msg: "Product Id Is Required" });
    }
    const FindOnePro = await ProductModal.findById({ _id: ProductId });
    if (!FindOnePro) {
      return res.send({ code: 400, Msg: "Product Not Found" });
    }
    if (FindOnePro) {
      return res.send({ code: 200, data: FindOnePro });
    }
  } catch (error) {
    return res.send({
      code: 500,
      Msg: "Error Geting on Getting Products",
      error,
    });
  }
};

const filterCatwise_product = async (req, res) => {
  const { CategoryIds, serchValue } = req.body;
  try {
    if (!CategoryIds) {
      return res
        .status(400)
        .send({ code: 400, Msg: "CategoryIds is Required" });
    }
    if (CategoryIds?.length == 0) {
      const data = await ProductModal.find({
        $or: [
          { Prodname: { $regex: serchValue, $options: "i" } },
          { options: { $regex: serchValue, $options: "i" } },
        ],
      });
      return res.status(200).send({ code: 200, data: data });
    }
    if (CategoryIds?.length) {
      const data = await ProductModal.find({
        Category: {
          $in: CategoryIds,
        },
        $or: [
          { Prodname: { $regex: serchValue, $options: "i" } },
          { Brand: { $regex: serchValue, $options: "i" } },
        ],
      });
      return res.send({ code: 200, data });
    }
  } catch (error) {
    return res.send({
      code: 500,
      Msg: "Error Geting on  Products",
      error,
    });
  }
};

const similer_product = async (req, res) => {
  const { BandName, ProductId } = req.body;
  try {
    if (!BandName) {
      return res.status(400).send({ code: 400, Msg: "BandName is Required" });
    }
    const FindData = await ProductModal.find({
      Brand: { $regex: BandName, $options: "i" },
    });
    return res.status(200).send({ code: 200, data: FindData });
  } catch (error) {
    return res.send({
      code: 500,
      Msg: "Error Geting on Products",
      error,
    });
  }
};

module.exports = {
  getall_products,
  delete_product,
  UpdateInsertProduct,
  single_product,
  filterCatwise_product,
  similer_product,
};
