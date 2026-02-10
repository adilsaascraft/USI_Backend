import mongoose from "mongoose";

/**
 * Checkbox option
 */
const CheckboxOptionSchema = new mongoose.Schema(
  {
    label: { type: String, default: "" },
  },
  { _id: false }
);

/**
 * Participant Field
 */
const ParticipantFieldSchema = new mongoose.Schema(
  {
    label: { type: String, default: "" },
    type: {
      type: String,
      enum: ["input", "checkbox"],
      required: true,
    },
    options: {
      type: [CheckboxOptionSchema],
      default: [],
    },
  },
  { _id: false }
);

/**
 * Feedback Question
 */
const FeedbackItemSchema = new mongoose.Schema(
  {
    feedbackName: { type: String, default: "" },

    parameterType: {
      type: String,
      enum: ["scale", "yes_no"],
      default: "scale",
    },

    options: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

/**
 * Open Ended
 */
const OpenEndedSchema = new mongoose.Schema(
  {
    label: { type: String, default: "" },
  },
  { _id: false }
);

/**
 * Main Schema
 */
const FeedbackSchema = new mongoose.Schema(
  {
    webinarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Webinar",
      required: true,
      unique: true,
    },

    participantFields: {
      type: [ParticipantFieldSchema],
      default: [],
    },

    feedbacks: {
      type: [FeedbackItemSchema],
      default: [],
    },

    openEnded: {
      type: [OpenEndedSchema],
      default: [],
    },

    closeNote: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Feedback ||
  mongoose.model("Feedback", FeedbackSchema);
