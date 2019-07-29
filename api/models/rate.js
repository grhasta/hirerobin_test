const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({
  name: {type: String, required: true},
});

module.exports = mongoose.model('Rate', RateSchema);