// models/Event.js
import mongoose from "mongoose";
import moment from "moment-timezone";

// Schema
const WebinarSchema = new mongoose.Schema(
  {
    webinarName: {
      type: String,
      required: [true, "Webinar Name is required"],
    },
    
    webinarImage: {
      type: String, // store file path or URL
      required: [true, "Webinar Image is required"],
    },
    startDate: {
      type: String, // Format: DD/MM/YYYY
      required: [true, "Start Date is required"],
    },
    endDate: {
      type: String, // Format: DD/MM/YYYY
      required: [true, "End Date is required"],
    },
    startTime: {
      type: String, // Format: hh:mm A (e.g., 09:00 AM)
      required: [true, "Start Time is required"],
    },
    endTime: {
      type: String, // Format: hh:mm A (e.g., 05:00 PM)
      required: [true, "End Time is required"],
    },
    timeZone: {
      type: String, // e.g., "Asia/Kolkata"
      required: [true, "Time Zone is required"],
    },
    registrationType: {
      type: String,
      enum: ["paid", "free"],
      required: [true, "Registration Type is required"],
    },
    amount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"], //  restricts to these values
      default: "Active",
      required: [true, "Status is required"],
    },
    streamLink: {
      type: String,
      required: [true, "Stream Link is required"],
    },
    
    // status removed from schema because we calculate it dynamically
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

/**
 * Virtual: Dynamic event status
 */
WebinarSchema.virtual("dynamicStatus").get(function () {
  const tz = this.timeZone || "UTC";

  const start = moment.tz(
    `${this.startDate} ${this.startTime}`,
    "DD/MM/YYYY hh:mm A",
    tz
  );

  const end = moment.tz(
    `${this.endDate} ${this.endTime}`,
    "DD/MM/YYYY hh:mm A",
    tz
  );

  const now = moment.tz(tz);

  if (now.isBefore(start)) return "Upcoming";
  if (now.isBetween(start, end, null, "[]")) return "Live";
  return "Past";
});

// Avoid model overwrite during hot-reload
export default mongoose.models.Webinar ||
  mongoose.model("Webinar", WebinarSchema);

