const HS = require("../models/HSCodesSchema");
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

HSRoute.get("/findhs", async (req, res) => {

  const { search } = req.query;
  const pr = await HS.find({name: { $regex: `${search}`, $options: '$i' }}, {});
  if (pr <= 0) {
    res.status(401).send("No Result");
  }
   else {
    res.send(pr);
  }
});


module.exports=HSRoute;
