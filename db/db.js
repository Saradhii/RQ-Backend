const mongoose = require("mongoose");

const connection = mongoose.connect(
  // "mongodb+srv://saradhi:saradhi123@cluster0.s0vsou1.mongodb.net/?retryWrites=true&w=majority"
  // "mongodb://127.0.0.1:27017/intoglo"
 "mongodb://intoglo123:intoglopass123@35.72.226.153:27017/intoglo"
);

module.exports = connection;