import express from "express";
import {
  getSummaryByWebinar,
  getAllSummaries,
  createSummary,
  updateSummary,
  deleteSummary,
} from "../controllers/summaryController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * Protected – Get summary by webinar
 */
router.get(
  "/summaries/:webinarId",
  protect,
  getSummaryByWebinar
);

/**
 * Admin – Get all summaries
 */
router.get(
  "/admin/summaries",
  protect,
  authorizeRoles("admin"),
  getAllSummaries
);

/**
 * Admin – Create summary
 */
router.post(
  "/admin/summaries/:webinarId",
  protect,
  authorizeRoles("admin"),
  createSummary
);

/**
 * Admin – Update summary
 */
router.put(
  "/admin/summaries/:id",
  protect,
  authorizeRoles("admin"),
  updateSummary
);

/**
 * Admin – Delete summary
 */
router.delete(
  "/admin/summaries/:id",
  protect,
  authorizeRoles("admin"),
  deleteSummary
);

export default router;
