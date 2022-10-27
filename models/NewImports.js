const { Schema, model} = require("mongoose");

const NewImportsSchema = ({
  name:String,
  discription:String,
  hscode:String,
  category:String,
  level:String,
});

const NHS = model("producths",NewImportsSchema);

module.exports = NHS;