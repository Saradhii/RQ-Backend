const RQ = require("../models/RequestQuoteSchema");
const Router = require("express");
const RQRoute = Router();

RQRoute.post("/create", (req, res) => {
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
    ship_type,
    discharging_rate,
    loading_rate,
    gross_weight,
  } = req.body;

  console.log(req.body);

  if (transportation_by == "FCL" || transportation_by == "ULDC") {
    const newrq = new RQ({
      product_details,
      delivery_mode,
      transportation_by,
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

    newrq.save((err, req) => {
      if (err) {
        return res.status(404).send({ status: 404, message: err.message });
      } else {
        return res
          .status(200)
          .send({ status: 200, message: "Request Quote created successfully" });
      }
    });
  } else if (transportation_by == "LCL" || transportation_by == "SC") {
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

      newrq.save((err, req) => {
        if (err) {
          return res.status(404).send({ status: 404, message: err.message });
        } else {
          return res.status(200).send({
            status: 200,
            message: "Request Quote created successfully By Units",
          });
        }
      });
    } else {
      const newrq = new RQ({
        product_details,
        delivery_mode,
        transportation_by,
        weight,
        volume,
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

      newrq.save((err, req) => {
        if (err) {
          return res.status(404).send({ status: 404, message: err.message });
        } else {
          return res.status(200).send({
            status: 200,
            message: "Request Quote created successfully",
          });
        }
      });
    }
  } else if (transportation_by == "Bulk") {
    const newrq = new RQ({
      product_details,
      delivery_mode,
      transportation_by,
      ship_type,
      gross_weight,
      loading_rate,
      discharging_rate,
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

    newrq.save((err, req) => {
      if (err) {
        return res.status(404).send({ status: 404, message: err.message });
      } else {
        return res
          .status(200)
          .send({ status: 200, message: "Request Quote created successfully" });
      }
    });
  }
});

RQRoute.get("/fetchByMode/Sea", async (req, res) => {
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
  const getDetailsForOne = await RQ.find({ delivery_mode: "Sea" });
  if (getDetailsForOne <= 0) {
    return res.status(404).send({ message: "Data not found !" });
  } else {
    return res.status(200).send(getDetailsForOne);
  }
});

RQRoute.get("/fetchByMode/LCL", async (req, res) => {
  const getDetailsForOne = await RQ.find({ transportation_by: "LCL" });
  if (getDetailsForOne <= 0) {
    return res.status(404).send({ message: "Data not found !" });
  } else {
    return res.status(200).send(getDetailsForOne);
  }
});

RQRoute.get("/fetchByMode/air", async (req, res) => {
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
  const getDetailsForOne = await RQ.find({ delivery_mode: "Air" });
  if (getDetailsForOne <= 0) {
    return res.status(404).send({ message: "Data not found !" });
  } else {
    return res.status(200).send(getDetailsForOne);
  }
});

RQRoute.get("/fetchAll", async (req, res) => {
  const allrq = await RQ.find();
  if (allrq) {
    return res.status(200).send(allrq);
  } else {
    return res.status(404).send({ Message: "No Data Found" });
  }
});

RQRoute.post("/fetchByEmail", async (req, res) => {
  const { email } = req.body;
  const getDetailsForOne = await RQ.find({ email: email });
  if (getDetailsForOne.length == 0) {
    return res
      .status(404)
      .send({ message: "Can not find details for entered email" });
  } else {
    return res.status(200).send(getDetailsForOne);
  }
});

module.exports = RQRoute;