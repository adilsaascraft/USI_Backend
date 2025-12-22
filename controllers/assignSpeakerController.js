import AssignSpeaker from "../models/AssignSpeaker.js";
import Webinar from "../models/Webinar.js";
import Speaker from "../models/Speaker.js";

// =======================
// Get all assigned speakers (public)
// =======================
export const getAssignedSpeakers = async (req, res) => {
  try {
    const assignments = await AssignSpeaker.find()
      .populate("webinarId")
      .populate("speakerId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch assigned speakers",
      error: error.message,
    });
  }
};

// =======================
// Get speakers assigned to one webinar
// =======================
export const getSpeakersByWebinar = async (req, res) => {
  try {
    const { webinarId } = req.params;

    const assignments = await AssignSpeaker.find({ webinarId })
      .populate("webinarId")
      .populate("speakerId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch webinar speakers",
      error: error.message,
    });
  }
};

// =======================
// Assign speaker to webinar (Admin only)
// =======================
export const assignSpeaker = async (req, res) => {
  try {
    const { webinarId } = req.params;
    const { speakerId, facultyType } = req.body;

    // 1 Validate webinar
    const webinarExists = await Webinar.findById(webinarId);
    if (!webinarExists) {
      return res.status(404).json({
        success: false,
        message: "Webinar not found",
      });
    }

    // 2 Validate speaker
    const speakerExists = await Speaker.findById(speakerId);
    if (!speakerExists) {
      return res.status(404).json({
        success: false,
        message: "Speaker not found",
      });
    }

    // 3 Check already assigned
    const alreadyAssigned = await AssignSpeaker.findOne({
      webinarId,
      speakerId,
    });
    if (alreadyAssigned) {
      return res.status(400).json({
        success: false,
        message: "Speaker is already assigned to this webinar",
      });
    }

    // 4 Assign speaker
    const assign = await AssignSpeaker.create({
      webinarId,
      speakerId,
      facultyType,
    });

    res.status(201).json({
      success: true,
      message: "Speaker assigned successfully",
      data: assign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to assign speaker",
      error: error.message,
    });
  }
};

// =======================
// Remove assigned speaker (Admin only)
// =======================
export const removeAssignedSpeaker = async (req, res) => {
  try {
    const { id } = req.params;

    const assigned = await AssignSpeaker.findByIdAndDelete(id);

    if (!assigned) {
      return res.status(404).json({
        success: false,
        message: "Assigned speaker not found",
      });
    }

    res.json({
      success: true,
      message: "Speaker removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove assigned speaker",
      error: error.message,
    });
  }
};
