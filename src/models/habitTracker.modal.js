const mongoose = require("mongoose");
const { Schema } = mongoose;

const habitTrackerSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    habit_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["complete", "incomplete"],
      required: true,
      default: "incomplete",
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
    date : {
      type : String,
      required : true ,
      trim : true
    }
  },
  {
    timestamps: true,
  }
);

const HabitTracker = mongoose.model("HabitTracker", habitTrackerSchema);
module.exports = HabitTracker;
