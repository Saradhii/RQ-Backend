const mongoose = require("mongoose");

const connection = mongoose.connect(
  // "mongodb+srv://saradhi:saradhi123@cluster0.s0vsou1.mongodb.net/?retryWrites=true&w=majority"
  // "mongodb://127.0.0.1:27017/intoglo"
 "mongodb://intoglo:intoglo@321@35.72.226.153:27017/?authMechanism=DEFAULT&authSource=intoglo"
);


module.exports = connection;