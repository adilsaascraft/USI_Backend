import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema(
  {
    webinarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Webinar",
      required: true,
    },
    meetingName: {
      type: String,
      required: [true, "Meeting name is required"],
    },
    meetingLink: {
      type: String,
      required: [true, "Meeting link is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Meeting ||
  mongoose.model("Meeting", MeetingSchema);
