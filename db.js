const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URL;

const connectToMongo = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log("MongoDB Connected ", conn.connection.host);
  } catch (error) {
    console.log("Error Connecting to MDB DB", error);
  }
};

module.exports = connectToMongo;
