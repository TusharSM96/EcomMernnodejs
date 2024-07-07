const userModule = require("../Models/userModels");
const { hashPassword, comparePassword } = require("../helper/authHelper");
const JWT = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    if (!name) {
      return res.status(400).json({ code: 400, Msg: "name is required" });
    }
    if (!email) {
      return res.status(400).json({ code: 400, Msg: "email is required" });
    }
    if (!password) {
      return res.status(400).json({ code: 400, Msg: "password is required" });
    }
    if (!phone) {
      return res.status(400).send({ code: 400, Msg: "phone is required" });
    }
    if (!address) {
      return res.status(400).json({ code: 400, Msg: "address is required" });
    }
    const FindeEmail = await userModule.find({ email: email });
    if (FindeEmail?.length) {
      return res.status(400).send({
        success: true,
        Msg: "Record Alrady Exiest",
        code: 400,
      });
    } else {
      let hashedPassword = await hashPassword(password);
      const bindmodule = new userModule({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
      });
      const adduser = await bindmodule.save();
      res.status(200).send({ Msg: "User Created Succsessfully", code: 200 });
    }
  } catch (error) {
    res.json({
      code: 500,
      Msg: "Error In Registetion",
      error,
    });
  }
};
const LoginuserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.status(400).send({ Msg: "email is required", code: 400 });
    }
    if (!password) {
      return res.status(400).send({ Msg: "password is required", code: 400 });
    }
    const UserFind = await userModule.find({ email: email });
    if (UserFind.length == 0) {
      return res.status(400).send({ Msg: "Email id Not register", code: 400 });
    }
    const validatepassword = await comparePassword(
      password,
      UserFind[0].password
    );
    if (validatepassword) {
      const jwt_token = await JWT.sign(
        { _Id: UserFind[0]._id },
        process.env.JWTSeqKey,
        { expiresIn: "1d" }
      );
      return res.status(200).send({
        Msg: "Login Succsess",
        code: 200,
        data: {
          name: UserFind[0].name,
          email: UserFind[0].email,
          phone: UserFind[0].phone,
          address: UserFind[0].address,
          role: UserFind[0].role,
          Token: jwt_token,
          code: 200,
        },
      });
    } else {
      return res.status(400).send({ Msg: "Invalid Password", code: 400 });
    }
  } catch (error) {
    res.status(400).send({
      Msg: "Error In Login",
      code: 400,
      error,
    });
  }
};

const forgetPassword = async (req, res) => {
  const { email, oldpwd, newpwd, confnewpwd } = req.body;
  try {
    if (!email) {
      return res.send({ code: 400, Msg: "Email Address is requird" });
    }
    if (!oldpwd) {
      return res.send({ code: 400, Msg: "Old Password is requird" });
    }
    if (!newpwd) {
      return res.send({ code: 400, Msg: "New Password is requird" });
    }
    if (!confnewpwd) {
      return res.send({ code: 400, Msg: "Confirm New Password is requird" });
    }
    if (newpwd !== confnewpwd) {
      return res.send({
        code: 400,
        Msg: "Confirm New Password and New Password is Not Same",
      });
    }
    const FindEmailData = await userModule.find({ email: email });
    if (FindEmailData?.length) {
      const cheakpassword = await comparePassword(
        oldpwd,
        FindEmailData[0]?.password
      );
      if (cheakpassword) {
        const NewHashPwd = await hashPassword(confnewpwd);
        const UpdateData = await userModule.updateOne(
          { email: email },
          {
            $set: {
              password: NewHashPwd,
            },
          }
        );
        return res.send({ code: 200, Msg: "Password Resent Successfully" });
      } else {
        return res.send({
          code: 400,
          Msg: "Old Password is Not Correct Plase Enter Valid Password",
        });
      }
    } else {
      return res.send({
        code: 400,
        Msg: "Email Address Not Register",
      });
    }
  } catch (error) {
    res.json({
      code: 500,
      Msg: "Error In Registetion",
      error,
    });
  }
};
module.exports = {
  registerController,
  LoginuserController,
  forgetPassword,
};
