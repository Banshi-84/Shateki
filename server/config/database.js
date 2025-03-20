const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

const serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
});

const db = admin.database();

module.exports = db;
