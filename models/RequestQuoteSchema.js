const { Schema, model } = require("mongoose");

const RequestQuoteSchema = new Schema({
  product_details: {
    type: Object,
  },
  delivery_mode: {
    type: String,
    required: [true, "Please Choose A Delivery Type"],
    enum: ["Sea", "Air"],
  },
  transportation_by: {
    type: String,
    required: [true, "Please Choose a Transportation way"],
    enum: ["FCL", "LCL", "Bulk", "SC", "ULDC"],
  },
  weight: { type: Number,
    required: [true, "Please specify weight"],
    default: 0 },
  volume: { type: Number,
    required: [true, "Please specify Volume"],
    default: 0 },
  by_units: { type: Boolean, default: false },
  dimensions: [],
  container_type: {
    type: String,
    required: [true, "Please Choose a container type"],
    enum: ["20' Standard","40' Standard","40' High-Cube","20' Refrigerated","40' Refrigerated","20' Open Top","40' Open Top","20' Flatrack","40' Flatrack","20' Tank","40' Flatrack Collapsible","20' Flatrack Collapsible","20' Platform","40' Platform","20' Bulk","45' High-Cube","10' Standard","N/A"],
    default:"N/A"
  },
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
  },
  email: {
    type: String,
    required: [true, "Please Enter a Valid Email Address"],
  },
}, { timestamps: true });

const RQ = model("RequestQuotes", RequestQuoteSchema);

module.exports = RQ;
