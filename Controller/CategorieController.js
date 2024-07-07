const ProductModels = require("../Models/CategorieModels");
const get_allCategory = async (req, res) => {
  try {
    const getData = await ProductModels.find({});
    const ChageData = getData?.map((value) => ({
      Catogoryname: value.Catogoryname,
      Discription: value.Discription,
      updatedAt: value.updatedAt,
      _id: value._id,
      CategoryIcon: value.CategoryIcon,
      createAt: value.createdAt,
      Active: value.Active,
    }));
    return res.send({ code: 200, data: ChageData });
  } catch (error) {
    return res.send({
      code: 500,
      Msg: "Error Getting On Mongo Connection",
      error,
    });
  }
};
const delete_category = async (req, res) => {
  const { categoryid } = req.body;
  try {
    if (!categoryid) {
      return res.send({ code: 400, Msg: "categoryid is required" });
    }
    const finddata = await ProductModels.findById({ _id: categoryid });
    if (finddata == null) {
      return res.send({ code: 200, Msg: "Category not found" });
    } else {
      const deletedata = await ProductModels.findByIdAndDelete({
        _id: categoryid,
      });
      return res.send({ code: 200, Msg: "Category delete successfully" });
    }
  } catch (error) {
    return res.send({
      code: 500,
      Msg: "Error Getting On Mongo Connection",
      error,
    });
  }
};
const getSingle_category = async (req, res) => {
  const { Categoryid } = req.body;
  try {
    if (!Categoryid) {
      return res.send({ code: 400, Msg: "Categoryid is Required" });
    }
    const FindCategory = await ProductModels.findById({ _id: Categoryid });
    if (!FindCategory) {
      return res.send({ code: 400, Msg: "Category not found" });
    }
    if (FindCategory) {
      return res.send({ code: 200, data: FindCategory });
    }
    return res.send({ code: 400, Msg: "Geting Error on Category modal" });
  } catch (error) {
    return res.send({
      code: 500,
      Msg: "Geting Error on Category modal",
      error,
    });
  }
};
const insertupdate_category = async (req, res) => {
  try {
    const { Categoryid, Catogoryname, Discription, CategoryIcon, Active } =
      req.body;
    if (!Catogoryname) {
      return res.send({ code: 400, Msg: "Catogoryname is Required" });
    }
    if (!Discription) {
      return res.send({ code: 400, Msg: "Discription is Required" });
    }
    if (!CategoryIcon) {
      return res.send({ code: 400, Msg: "CategoryIcon is Required" });
    }
    if (!Active) {
      return res.send({ code: 400, Msg: "Active is Required" });
    }
    if (Categoryid == null) {
      const FindCategory = await ProductModels.find({
        Catogoryname: Catogoryname.toUpperCase(),
      });
      if (FindCategory?.length) {
        return res.send({ code: 400, Msg: "Catogoryname is Already Exist" });
      }
      if (FindCategory?.length == 0) {
        const DataBindWithModel = new ProductModels({
          Catogoryname: Catogoryname.toUpperCase(),
          Discription: Discription,
          CategoryIcon: CategoryIcon,
          Active: Active,
        });
        const AddData = await DataBindWithModel.save();
        return res.send({ code: 200, Msg: "Record Created Successfully" });
      }
    } else {
      const FindCategory = await ProductModels.findById({ _id: Categoryid });
      if (!FindCategory) {
        return res.send({ code: 400, Msg: "Category not found" });
      }
      if (FindCategory) {
        const SaveData = await ProductModels.findByIdAndUpdate(
          { _id: Categoryid },
          {
            Catogoryname: Catogoryname.toUpperCase(),
            Discription: Discription,
            CategoryIcon: CategoryIcon,
            Active: Active,
          }
        );
        if (!SaveData) {
          return res.send({ code: 400, Msg: "Error on Updating Recored" });
        } else {
          return res.send({ code: 200, Msg: "Record Update Successfully" });
        }
      }
    }
  } catch (error) {
    if(error.code===11000){
      return res.send({code:400,Msg:"Category Name Alrady Exixt"})
    }
    return res.send({
      code: 500,
      Msg: "Error Getting On Mongo Connection",
      error,
    });
  }
};
module.exports = {
  get_allCategory,
  delete_category,
  getSingle_category,
  insertupdate_category,
};
