"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  background: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Mongoose.model("Project", projectSchema);