import Meeting from "../models/Meeting.js";
import Webinar from "../models/Webinar.js";

/**
 * ==============================
 * Get meeting by webinar (Protected)
 * ==============================
 */
export const getMeetingByWebinar = async (req, res) => {
  try {
    const { webinarId } = req.params;

    const meeting = await Meeting.findOne({ webinarId }).populate("webinarId");

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found for this webinar",
      });
    }

    res.json({
      success: true,
      data: meeting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch meeting",
      error: error.message,
    });
  }
};

/**
 * ==============================
 * Get all meetings (Admin only)
 * ==============================
 */
export const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find()
      .populate("webinarId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: meetings.length,
      data: meetings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch meetings",
      error: error.message,
    });
  }
};


/**
 * ==============================
 * Create meeting (Admin only)
 * Only one meeting per webinar
 * ==============================
 */
export const createMeeting = async (req, res) => {
  try {
    const { webinarId } = req.params;
    const { meetingName, meetingLink, meetingId, passCode } = req.body;

    // 1️ Validate webinar
    const webinarExists = await Webinar.findById(webinarId);
    if (!webinarExists) {
      return res.status(404).json({
        success: false,
        message: "Webinar not found",
      });
    }

    // 2️ Check if meeting already exists
    const meetingExists = await Meeting.findOne({ webinarId });
    if (meetingExists) {
      return res.status(400).json({
        success: false,
        message: "Meeting already exists for this webinar",
      });
    }

    // 3️ Create meeting
    const meeting = await Meeting.create({
      webinarId,
      meetingName,
      meetingLink,
      meetingId,
      passCode,
    });

    res.status(201).json({
      success: true,
      message: "Meeting created successfully",
      data: meeting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create meeting",
      error: error.message,
    });
  }
};

/**
 * ==============================
 * Update meeting (Admin only)
 * ==============================
 */
export const updateMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const { meetingName, meetingLink, meetingId, passCode } = req.body;

    const meeting = await Meeting.findById(id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    meeting.meetingName = meetingName || meeting.meetingName;
    meeting.meetingLink = meetingLink || meeting.meetingLink;
    meeting.meetingId = meetingId || meeting.meetingId;
    meeting.passCode = passCode || meeting.passCode;
    
    await meeting.save();

    res.json({
      success: true,
      message: "Meeting updated successfully",
      data: meeting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update meeting",
      error: error.message,
    });
  }
};

/**
 * ==============================
 * Delete meeting (Admin only)
 * ==============================
 */
export const deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    const meeting = await Meeting.findByIdAndDelete(id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    res.json({
      success: true,
      message: "Meeting deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete meeting",
      error: error.message,
    });
  }
};
