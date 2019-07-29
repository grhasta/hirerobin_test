const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  rate: { type: Schema.Types.ObjectId, ref: 'Rate', required: true },
  reviewer_capacity: {type: String, required: true},
  origin: {type: String, required: true},
  contribution: {type: Number, min:1, max:10 ,required: true},
  skill: { type: Schema.Types.ObjectId, ref: 'Skill', required: true },
  key_strength: {type: String, required: true},
  reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reviewed: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);