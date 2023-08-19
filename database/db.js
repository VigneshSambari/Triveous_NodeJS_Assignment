const mongoose = require("mongoose");
const config = require("config");

const dburl = config.get("DBURL");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(dburl, {
      useNewUrlParser: true,
    });
    console.log("db conected ..");
  } catch (err) {
    console.log("err. in db connection .", err);
    process.exit(1);
  }
};

module.exports = connectDB;
