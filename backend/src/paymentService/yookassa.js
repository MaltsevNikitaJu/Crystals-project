const { YooCheckout } = require("@a2seven/yoo-checkout");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const checkout = new YooCheckout({
  shopId: process.env.SHOP_ID,
  secretKey: process.env.SHOP_API_KEY,
});

module.exports = { checkout };
