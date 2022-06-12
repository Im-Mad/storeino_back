const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  }
}, {strict: false, capped: {max: 4}});

module.exports = mongoose.model('Config', configSchema);
