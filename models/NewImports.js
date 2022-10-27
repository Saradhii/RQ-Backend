const { Schema, model} = require("mongoose");

const NewImportsSchema = ({
  Section_ID:String,
  Section:String,
  HS2_ID:String,
  HS2:String,
  HS4_ID:String,
  name:String,
  hscode:String,
  discription:String,
  Trade_Value:String
});

const NHS = model("producths",NewImportsSchema);

module.exports = NHS;