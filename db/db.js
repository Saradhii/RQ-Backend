const mongoose = require("mongoose");

const connection = mongoose.connect(
  // "mongodb+srv://saradhi:saradhi123@cluster0.s0vsou1.mongodb.net/?retryWrites=true&w=majority"
  "mongodb://127.0.0.1:27017:27017"
);


module.exports = connection;