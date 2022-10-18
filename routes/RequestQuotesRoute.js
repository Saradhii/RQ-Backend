const RQ = require("../models/RequestQuoteSchema");
const Router = require("express");
const RQRoute = Router();

RQRoute.post("/newrequest", (req, res) => {
  const {
    product_details,
    delivery_mode,
    transportation_by,
    weight,
    volume,
    by_units,
    dimensions,
    container_type,
    containers_quantity,
    location_from,
    location_to,
    ready_to_load,
    additional_infromation,
    associated_services,
    first_name,
    last_name,
    phone,
    email,
  } = req.body;

  if (by_units) {
    const newrq = new RQ({
      product_details,
      delivery_mode,
      transportation_by,
      by_units,
      dimensions,
      location_from,
      location_to,
      ready_to_load,
      additional_infromation,
      associated_services,
      first_name,
      last_name,
      phone,
      email,
    });

    newrq.save().then(() => {
        res.send({
          status: 200,
          message: "Request Quote created successfully",
        });
      }).catch((err) => console.log(err));
  } else {
    const newrq = new RQ({
      product_details,
      delivery_mode,
      transportation_by,
      weight,
      volume,
      container_type,
      containers_quantity,
      location_from,
      location_to,
      ready_to_load,
      additional_infromation,
      associated_services,
      first_name,
      last_name,
      phone,
      email,
    });

    newrq
      .save()
      .then(() => {
        res.send({
          status: 200,
          message: "Request Quote created successfully",
        });
      })
      .catch((err) => console.log(err));
  }
});

RQRoute.get("/getall/sea", async (req, res) => {
  const query = req.query.transportation_by;

  if (query) {
    const allrq = await RQ.find({
      delivery_mode: "Sea",
      transportation_by: query,
    });
    if (allrq) {
      return res.status(200).send(allrq);
    } else {
      return res.status(404).send({ Message: "No Data Found" });
    }
  }
  const allrq = await RQ.find({ delivery_type: "Sea" });
  if (allrq) {
    return res.status(200).send(allrq);
  } else {
    return res.status(404).send({ Message: "No Data Found" });
  }
});

RQRoute.get("/getall/air", async (req, res) => {
  const query = req.query.transportation_by;

  if (query) {
    const allrq = await RQ.find({
      delivery_mode: "Air",
      transportation_by: query,
    });
    if (allrq) {
      return res.status(200).send(allrq);
    } else {
      return res.status(404).send({ Message: "No Data Found" });
    }
  }
  const allrq = await RQ.find({ delivery_type: "Sea" });
  if (allrq) {
    return res.status(200).send(allrq);
  } else {
    return res.status(404).send({ Message: "No Data Found" });
  }
});

RQRoute.get("/getall", async (req, res) => {
  const allrq = await RQ.find();
  if (allrq) {
    return res.status(200).send(allrq);
  } else {
    return res.status(404).send({ Message: "No Data Found" });
  }
});

RQRoute.get("/getone", async (req, res) => {
  const { email } = req.body;

  const getDetailsForOne = await RQ.findOne({ email: email });
  if (getDetailsForOne) {
    return res.status(200).send(getDetailsForOne);
  } else {
    return res
      .status(404)
      .send({ message: "Can not find details for entered email" });
  }
});

module.exports = RQRoute;
