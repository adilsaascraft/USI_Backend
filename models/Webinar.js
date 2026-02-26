import mongoose from "mongoose";

// Schema
const WebinarSchema = new mongoose.Schema(
  {
    webinarType: {
      type: String,
      enum: ["USI Webinar", "Smart Learning Program", "Live Operative Workshops"],
      required: [true, "Webinar Type is required"],
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    image: {
      type: String,
      required: [true, "Image is required"],
    },

    // ✅ GLOBAL STANDARD (ISO UTC)
    startDateTime: {
      type: Date,
      required: [true, "Start DateTime is required"],
      index: true,
    },

    endDateTime: {
      type: Date,
      required: [true, "End DateTime is required"],
      index: true,
    },

    // Keep timezone for reference / audit
    timeZone: {
      type: String,
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
      min: 0,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
      required: [true, "Status is required"],
      index: true,
    },

    streamLink: {
      type: String,
      required: [true, "Stream Link is required"],
    },

    description: {
      type: String,
      trim: true,
    },

    brochureUpload: {
      type: String,
    },

    attendedMailSent: {
      type: Boolean,
      default: false,
    },

    notAttendedMailSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//
// ✅ INDEX OPTIMIZATION
//
WebinarSchema.index({ startDateTime: 1, status: 1 });
WebinarSchema.index({ endDateTime: 1 });

//
// ✅ Ensure free webinars always have amount = 0
//
WebinarSchema.pre("save", function (next) {
  if (this.registrationType === "free") {
    this.amount = 0;
  }
  next();
});

WebinarSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update?.registrationType === "free") {
    update.amount = 0;
  }

  next();
});

//
// ✅ Clean Dynamic Status (UTC comparison)
//
WebinarSchema.virtual("dynamicStatus").get(function () {
  const now = new Date();

  if (!this.startDateTime || !this.endDateTime) return "Upcoming";

  if (now < this.startDateTime) return "Upcoming";
  if (now >= this.startDateTime && now <= this.endDateTime)
    return "Live";

  return "Past";
});

// Prevent model overwrite during hot reload
export default mongoose.models.Webinar ||
  mongoose.model("Webinar", WebinarSchema);