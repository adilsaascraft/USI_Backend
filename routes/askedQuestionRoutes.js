// routes/askedQuestionRoutes.js
import express from "express";
import {
  addQuestion,
  getQuestionsByWebinar,
  deleteQuestionByWebinar,
} from "../controllers/askedQuestionController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public: Get all questions of a webinar
router.get("/webinars/:webinarId/questions", getQuestionsByWebinar);

// Authorized user: Ask a question
router.post(
  "/webinars/:webinarId/questions",
  protect,
  authorizeRoles("user"),
  addQuestion
);

// Admin: Delete a question by webinar
router.delete(
  "/webinars/:webinarId/questions/:questionId",
  protect,
  authorizeRoles("admin"),
  deleteQuestionByWebinar
);

export default router;
