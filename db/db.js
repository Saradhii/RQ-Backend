const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://saradhi:saradhi123@cluster0.s0vsou1.mongodb.net/?retryWrites=true&w=majority"
);


module.exports = connection;