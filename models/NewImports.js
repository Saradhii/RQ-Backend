const { Schema, model} = require("mongoose");

const NewImportsSchema = ({
  Section_ID:String,
  Section:String,
  HS2_ID:String,
  HS2:String,
  HS4_ID:String,
  HS4:String,
  HS6_ID:String,
  HS6:String,
  Trade_Value:String
});

const NHS = model("producths",NewImportsSchema);

module.exports = NHS;