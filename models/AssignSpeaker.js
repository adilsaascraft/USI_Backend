import mongoose from "mongoose";

const AssignSpeakerSchema = new mongoose.Schema(
  {
    webinarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Webinar",
      required: true,
    },
    speakerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Speaker",
      required: true,
    },
    facultyType: {
      type: String,
      required: [true, "Faculty Type is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.AssignSpeaker ||
  mongoose.model("AssignSpeaker", AssignSpeakerSchema);
