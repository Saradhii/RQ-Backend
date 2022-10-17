const { Schema, model} = require("mongoose");

const CitySchema = ({
    country: String,
    name: String,
    lat: String,
    lng: String
  });

const City = model("cities",CitySchema);

module.exports = City;