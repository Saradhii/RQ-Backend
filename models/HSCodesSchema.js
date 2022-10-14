const { Schema, model} = require("mongoose");

const HSCodesSchema = ({
  name:String,
  discription:String,
  hscode:String,
  category:String,
  level:String,
});

const HS = model("hscodes",HSCodesSchema);

module.exports = HS;