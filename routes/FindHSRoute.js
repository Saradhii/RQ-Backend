const HS = require("../models/HSCodesSchema");
const NHS = require("../models/NewImports");
const City = require("../models/CitySchema");
const RQ = require("../models/RequestQuoteSchema");
const Router = require("express");
const HSRoute = Router();

// HSRoute.get("/findhs", async (req, res) => {

//     const { name } = req.query;
//     const pr = await HS.find({ $text: { $search: name } });
  
//     if (pr <= 0) {
//       res.status(401).send("No Result");
//     }
//      else {
//       res.send(pr);
//     }
//   });

HSRoute.get("/findHSCode", async (req, res) => {

  const { search } = req.query;
  const pr = await HS.find({name: { $regex: `${search}`, $options: '$i' }}, {});
  if (pr <= 0) {
    res.status(401).send("No Result");
  }
   else {
    res.send(pr);
  }
});

HSRoute.get("/findhs", async (req, res) => {

  const { search } = req.query;
  // console.log(search);
  const pr = await NHS.find({HS6: { $regex: `^${search}`, $options: '$i'}}, {});
  if (pr <= 0) {
    res.status(401).send("No Result");
  }
   else {
    res.send(pr);
  }
});

HSRoute.get("/findCity", async (req, res) => {

  const { search } = req.query;
  const pr = await City.find({name: { $regex: `${search}`, $options: '$i' }}, {});
  if (pr <= 0) {
    res.status(401).send("No Result");
  }
   else {
    res.send(pr);
  }
});

HSRoute.get("/GlobalSearch", async (req, res) => {

  const { search } = req.query;
  const pr = await RQ.find({ $text : { $search:  `${search}`}});
  if (pr <= 0) {
    res.status(404).send("No Result");
  }
   else {
    res.send(pr);
  }
});

module.exports=HSRoute;
