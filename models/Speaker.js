import mongoose from "mongoose";

const SpeakerSchema = new mongoose.Schema(
  {
    prefix: {
      type: String,
      required: [true, "Prefix is required"],
    },
    speakerName: {
      type: String,
      required: [true, "Speaker Name is required"],
    },
    specialization: {
      type: String,
    },
    speakerProfilePicture: {
      type: String,
      required: [true, "Speaker Image is required"],
    },
    affiliation: {
      type: String,
      required: [true, "Affiliation is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"], //  restricts to these values
      default: "Active",
      required: [true, "Status is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Speaker ||
  mongoose.model("Speaker", SpeakerSchema);
