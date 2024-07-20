const crypto = require("crypto");

const generateIdempotenceKey = () => {
  return crypto.randomBytes(16).toString("hex");
};

module.exports = generateIdempotenceKey;
