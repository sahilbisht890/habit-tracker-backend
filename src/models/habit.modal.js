const mongoose = require('mongoose');
const { Schema } = mongoose;

const habitSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dailyGoal: {
      type: Number,
      required: true,
      min: 1,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
