import mongoose from "mongoose";

const SummarySchema = new mongoose.Schema(
  {
    webinarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Webinar",
      required: true,
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Summary ||
  mongoose.model("Summary", SummarySchema);
