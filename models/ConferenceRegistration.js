import mongoose from "mongoose";

const ConferenceRegistrationSchema = new mongoose.Schema(
  {
    conferenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conference",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    membershipNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ConferenceRegistration ||
  mongoose.model("ConferenceRegistration", ConferenceRegistrationSchema);