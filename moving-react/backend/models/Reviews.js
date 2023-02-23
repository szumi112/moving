const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  row: {
    type: String,
  },
  img: {
    type: String,
  },
  review: {
    type: String,
    required: true,
  },
});

const Reviews = mongoose.model("Reviews", ReviewSchema);
module.exports = Reviews;
