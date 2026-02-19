import Summary from "../models/Summary.js";
import Webinar from "../models/Webinar.js";

/**
 * ==============================
 * Get summary by webinar (Protected)
 * ==============================
 */
export const getSummaryByWebinar = async (req, res) => {
  try {
    const { webinarId } = req.params;

    const summary = await Summary.findOne({ webinarId })
      .populate("webinarId");

    if (!summary) {
      return res.status(404).json({
        success: false,
        message: "Summary not found for this webinar",
      });
    }

    res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch summary",
      error: error.message,
    });
  }
};


/**
 * ==============================
 * Get all summaries (Admin only)
 * ==============================
 */
export const getAllSummaries = async (req, res) => {
  try {
    const summaries = await Summary.find()
      .populate("webinarId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: summaries.length,
      data: summaries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch summaries",
      error: error.message,
    });
  }
};


/**
 * ==============================
 * Create summary (Admin only)
 * Only one summary per webinar
 * ==============================
 */
export const createSummary = async (req, res) => {
  try {
    const { webinarId } = req.params;
    const { summary } = req.body;

    // 1️ Validate webinar
    const webinarExists = await Webinar.findById(webinarId);
    if (!webinarExists) {
      return res.status(404).json({
        success: false,
        message: "Webinar not found",
      });
    }

    // 2️ Check if summary already exists
    const summaryExists = await Summary.findOne({ webinarId });
    if (summaryExists) {
      return res.status(400).json({
        success: false,
        message: "Summary already exists for this webinar",
      });
    }

    // 3️ Create summary
    const newSummary = await Summary.create({
      webinarId,
      summary,
    });

    res.status(201).json({
      success: true,
      message: "Summary created successfully",
      data: newSummary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create summary",
      error: error.message,
    });
  }
};


/**
 * ==============================
 * Update summary (Admin only)
 * ==============================
 */
export const updateSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const { summary } = req.body;

    const existingSummary = await Summary.findById(id);

    if (!existingSummary) {
      return res.status(404).json({
        success: false,
        message: "Summary not found",
      });
    }

    existingSummary.summary = summary || existingSummary.summary;

    await existingSummary.save();

    res.json({
      success: true,
      message: "Summary updated successfully",
      data: existingSummary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update summary",
      error: error.message,
    });
  }
};


/**
 * ==============================
 * Delete summary (Admin only)
 * ==============================
 */
export const deleteSummary = async (req, res) => {
  try {
    const { id } = req.params;

    const summary = await Summary.findByIdAndDelete(id);

    if (!summary) {
      return res.status(404).json({
        success: false,
        message: "Summary not found",
      });
    }

    res.json({
      success: true,
      message: "Summary deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete summary",
      error: error.message,
    });
  }
};
