const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

const generateToken = (user, roles) => {
  return jwt.sign(
    { id: user.id, email: user.email, roles },
    secret,
    { expiresIn: '1d' }
  );
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("TokenExpiredError");
    } else {
      throw new Error("InvalidTokenError");
    }
  }
};

module.exports = { generateToken, verifyToken };
