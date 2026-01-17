// controllers/topicCommentController.js
import TopicComment from "../models/TopicComment.js";
import Conference from "../models/Conference.js";
import Session from "../models/Session.js";
import Topic from "../models/Topic.js";

/**
 * ===========================
 * POST topic comment (Auth)
 * ===========================
 * POST /conferences/:conferenceId/sessions/:sessionId/topics/:topicId/comments
 */
export const addTopicComment = async (req, res) => {
  try {
    const { conferenceId, sessionId, topicId } = req.params;
    const { userId, comment } = req.body;

    // Validate conference
    const conference = await Conference.findById(conferenceId);
    if (!conference) {
      return res.status(404).json({
        success: false,
        message: "Conference not found",
      });
    }

    // Validate session
    const session = await Session.findOne({
      _id: sessionId,
      conferenceId,
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    // Validate topic
    const topic = await Topic.findOne({
      _id: topicId,
      sessionId,
    });

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    // Create comment
    const newComment = await TopicComment.create({
      conferenceId,
      sessionId,
      topicId,
      userId,
      comment,
    });

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add topic comment",
      error: error.message,
    });
  }
};

/**
 * =========================================
 * GET comments by topic (Public)
 * =========================================
 * GET /conferences/:conferenceId/sessions/:sessionId/topics/:topicId/comments
 */
export const getTopicComments = async (req, res) => {
  try {
    const { conferenceId, sessionId, topicId } = req.params;

    const comments = await TopicComment.find({
      conferenceId,
      sessionId,
      topicId,
    })
      .populate("userId", "name email profilePicture")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      total: comments.length,
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch topic comments",
      error: error.message,
    });
  }
};
