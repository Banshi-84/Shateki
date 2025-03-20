const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  FIREBASE_DB_URL: process.env.FIREBASE_DB_URL,
};
