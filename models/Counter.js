const { Schema, model} = require("mongoose");

const CounterSchema = ({
    _id: String,
    sequence_value: Number,
  });

const Counter = model("counters",CounterSchema);

module.exports = Counter;