const City = require("../models/CitySchema");
const Router = require("express");
const CityRoute = Router();


CityRoute.get("/findCity", async (req, res) => {

  const { search } = req.query;
  const pr = await City.find({name: { $regex: `^${search}`, $options: '$i' }}, {});
  if (pr <= 0) {
    res.status(401).send("No Result");
  }
   else {
    res.send(pr);
  }
});

module.exports=CityRoute;