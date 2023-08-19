const jwt = require("jsonwebtoken");
const config = require("config");
const JwtKey = config.get("JwtKey");

const {responseHandler,respondToError} = require("../utils/responseHandler");
const {statusEnum} = require("../utils/statusCodes");

const authMiddleware = async (req, res, next) => {
  if(!req.headers.authorization){
    return res.status(statusEnum.BAD_GATEWAY).json(responseHandler.TOKEN_NOT_FOUND);
  }
  const token = req.headers.authorization.split(' ')[1];
  if (!token) { 
    console.log("no token found ");
    return res.status(statusEnum.UNAUTHORISED).json(responseHandler.TOKEN_NOT_FOUND);
  }

  try {
    const decode = jwt.verify(token, JwtKey);
    req.body.user = decode;
    next();
  } catch (err) {
    console.log("err in auth middleware ");
    return res.status(statusEnum.BAD_REQUEST).json(respondToError(err.message));
  }
};

module.exports = {authMiddleware};