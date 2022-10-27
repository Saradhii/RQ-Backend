const { Schema, model } = require("mongoose");

const RequestQuoteSchema = new Schema(
  {
    product_details: {
      name: { type: String },
      description: { type: String },
      hscode: { type: String },
      level: { type: String },
      category: { type: String },
      hazardous_cargo: {
        isTrue: { type: Boolean },
        imo_class: {
          type: String,
          enum: [
            "1.1 Explosives with a mass explosion hazard",
            "1.2 Explosives with a severe projection hazard",
            "1.3 Explosives with a fire",
            "1.4 Minor fire or projection hazard",
            "1.5 An insensitive substance with a mass explosion hazard",
            "1.6 Extremely insensitive articles",
            "2.1 Flammable gas",
            "2.2 Non-flammable, Non-poisoned Gas",
            "2.3 Oxygen Gas",
            "2.4 Poison Gas",
            "3 Flammable liquid",
            "4.1 Flammable solids or Substances",
            "4.2 Flammable solids",
            "4.3 Substances which, in contact with water, emit flammable gas",
            "5.1 Oxidizing substances (agents) by yielding oxygen increase the risk and intensity of fire",
            "5.2 Organic peroxides- most will burn rapidly and are sensitive to impact or friction",
            "6.1 Toxic substances",
            "6.2 Infectious substances",
            "7 Radioactive substances",
            "8 Corrosives",
            "9 Miscellaneous dangerous substances and articles",
          ],
        },
        un_number: { type: String },
      },
      perishable_cargo: {
        isTrue: { type: Boolean },
        temperature: { type: String },
        type: { type: String, enum: ["°C", "°F"] },
      },
      oversized_cargo: {
        isTrue: { type: Boolean },
        length: { type: Number },
        width: { type: Number },
        height: { type: Number },
      },
      liquid_cargo: {
        isTrue: { type: Boolean },
      },
    },
    incoterms: { type: String },
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
    weight: {
      type: Number,
      required: [true, "Please specify weight"],
      default: 0,
    },
    volume: {
      type: Number,
      required: [true, "Please specify Volume"],
      default: 0,
    },
    by_units: { type: Boolean, default: false },
    dimensions: [Object],
    container_type: {
      type: String,
      required: [true, "Please Choose a container type"],
      enum: [
        "20' Standard",
        "40' Standard",
        "40' High-Cube",
        "20' Refrigerated",
        "40' Refrigerated",
        "20' Open Top",
        "40' Open Top",
        "20' Flatrack",
        "40' Flatrack",
        "20' Tank",
        "40' Flatrack Collapsible",
        "20' Flatrack Collapsible",
        "20' Platform",
        "40' Platform",
        "20' Bulk",
        "45' High-Cube",
        "10' Standard",
        "Demi",
        "HMA Stall",
        "LD-1",
        "LD-2",
        "LD-26",
        "LD-29",
        "LD-29 Reefer",
        "LD-3",
        "LD-3 Reefer",
        "LD-39",
        "LD-4",
        "LD-6",
        "LD-7",
        "LD-7 with Angled Wings",
        "LD-7 with Folding Wings",
        "LD-8",
        "LD-9",
        "LD-9 Reefer",
        "M-1",
        "M-1H",
        "M-2",
        "M-6",
        "M-6 (118H)",
        "M-6 Twin Car Rack",
        "MDP",
        "PLA Half Pallet",
        "PNP/P6P Pallet",
        "PNA Half Pallet",
        "Type A Pen",
        "N/A",
      ],
      default: "N/A",
    },
    ship_type: {
      type: String,
      required: [true, "Please Choose a container type"],
      enum: [
        "Bulk Careers",
        "Containerships",
        "General cargo",
        "Product tankers/Asphalt carriers",
        "Product tankers/Chemical tankers",
        "Product tankers/Crude carriers",
        "Product tankers/Gas carriers",
        "Specialized/Heavy-lift",
        "Specialized/Livestock",
        "Specialized/Refrigerated",
        "Specialized/RoRo",
        "Specialized/Wood chip",
        "N/A",
      ],
      default: "N/A",
    },
    ship_type: {
      type: String,
      required: [true, "Please Choose a container type"],
      enum: [
        "Bulk Careers",
        "Containerships",
        "General cargo",
        "Product tankers/Asphalt carriers",
        "Product tankers/Chemical tankers",
        "Product tankers/Crude carriers",
        "Product tankers/Gas carriers",
        "Specialized/Heavy-lift",
        "Specialized/Livestock",
        "Specialized/Refrigerated",
        "Specialized/RoRo",
        "Specialized/Wood chip",
        "N/A",
      ],
      default: "N/A",
    },
    gross_weight: {
      type: Number,
      required: [true, "Please specify Gross weight"],
      default: 0,
    },
    loading_rate: {
      type: Number,
      required: [true, "Please specify loading rate"],
      default: 0,
    },
    discharging_rate: {
      type: Number,
      required: [true, "Please specify discharging rate"],
      default: 0,
    },
    containers_quantity: { type: Number, default: 0 },
    location_from: {
      type: String,
      required: [true, "Please Enter Starting Destination"],
    },
    location_to: {
      type: String,
      required: [true, "Please Enter Ending Destination"],
    },
    ready_to_load: { type: String },
    additional_information: { type: String, default: "N/A" },
    associated_services: {
      insurance: { type: Boolean, default: false },
      inspection: { type: Boolean, default: false },
      certification: { type: Boolean, default: false },
      customs_clearance: { type: Boolean, default: false },
    },
    first_name: { type: String, required: [true, "Please Enter First Name"] },
    last_name: { type: String, required: [true, "Please Enter Last Name"] },
    phone: {
      dialcode: { type: String },
      country: { type: String },
      isocode: { type: String },
      number: {
        type: String,
        required: [true, "Please Enter Valid Phone Number"],
      },
    },
    email: {
      type: String,
      required: [true, "Please Enter a Valid Email Address"],
    },
  },
  { timestamps: true }
);

const RQ = model("RequestQuotes", RequestQuoteSchema);

module.exports = RQ;
