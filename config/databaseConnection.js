const mongoose = require("mongoose");
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB🔌🟢");
  } catch (error) {
    console.error("MongoDB connection failed🔌❌ ");
  }
}; //Connects the application to MongoDB

module.exports = connectMongoDB;
