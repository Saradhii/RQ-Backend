const { Schema, model } = require("mongoose");

const RequestQuoteSchema = new Schema({
  product_details: {
    type: Object,
  },
  delivery_type: {
    type: String,
    required: [true, "Please Choose A Delivery Type"],
    enum: ["Sea", "Air"],
  },
  transportation_by: {
    type: String,
    required: [true, "Please Choose a Transportation way"],
    enum: ["FCL", "LCL", "Bulk", "SC", "ULDC"],
  },
  weight: { type: Number },
  volume: { type: Number },
  byunits: { type: Boolean, default: false },
  dimensions: [],
  container_type: { type: String },
  containers_quantity: { type: Number },
  location_from: {
    type: String,
    required: [true, "Please Enter Starting Destination"],
  },
  location_to: {
    type: String,
    required: [true, "Please Enter Ending Destination"],
  },
  ready_to_load: { type: String },
  additional_information: { type: String },
  associated_services: { type: String },
  first_name: { type: String, required: [true, "Please Enter First Name"] },
  last_name: { type: String, required: [true, "Please Enter Last Name"] },
  phone: {
    type: String,
    required: [true, "Please Enter Valid Phone Number"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please Enter a Valid Email Address"],
    unique: true,
  },
});

const RQ = model("RequestQuotes", RequestQuoteSchema);

module.exports = RQ;
