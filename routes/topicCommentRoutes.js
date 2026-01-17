// routes/topicCommentRoutes.js
import express from "express";
import {
  addTopicComment,
  getTopicComments,
} from "../controllers/topicCommentController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * Public – Get comments of a topic
 */
router.get(
  "/conferences/:conferenceId/sessions/:sessionId/topics/:topicId/comments",
  getTopicComments
);

/**
 * Authorized user – Add topic comment
 */
router.post(
  "/conferences/:conferenceId/sessions/:sessionId/topics/:topicId/comments",
  protect,
  authorizeRoles("user"),
  addTopicComment
);

export default router;
