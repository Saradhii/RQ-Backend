const { Schema, model} = require("mongoose");

const CitySchema = ({
    country: String,
    name: String,
    subcountry: String,
    geonameid: String
  });

const City = model("cities",CitySchema);

module.exports = City;