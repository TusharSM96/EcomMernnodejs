const JWT = require("jsonwebtoken");
const requireMidlware = async (req, res,next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(400).send({ Msg: "Plase Add Token", code: 400 });
    }
    const Token = authorization.split(" ")[1];
    const VarifyToken = await JWT.verify(Token, process.env.JWTSeqKey);
    next()
  } catch (error) {
    if (error.message == "jwt expired") {
      return res.status(400).send({ Msg: "Token Is Expired", code: 400 });
    } else {
      res
        .status(400)
        .send({ Msg: "Error Getting In Middlware", code: 400, error });
    }
  }
};
module.exports = {
  requireMidlware,
};
