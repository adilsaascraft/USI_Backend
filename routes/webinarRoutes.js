// routes/webinarRoutes.js
import express from "express";
import {
  getWebinars,
  getActiveWebinars,
  getLiveWebinars,
  getWebinarById,
  createWebinar,
  updateWebinar,
  deleteWebinar,
} from "../controllers/webinarController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { uploadWebinarImage } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public: anyone can view all webinars
router.get("/webinars", getWebinars);

// Public: Get all active webinars
router.get("/webinars/active", getActiveWebinars);

// Public: Get all live webinars
router.get("/webinars/live", getLiveWebinars);

router.get("/webinars/:id", getWebinarById);

// Admin-only: Create a new webinar
router.post(
  "/admin/webinars",
  protect,
  authorizeRoles("admin"),
  uploadWebinarImage.single("webinarImage"),
  createWebinar
);

// Admin-only: Update a webinar
router.put(
  "/admin/webinars/:id",
  protect,
  authorizeRoles("admin"),
  uploadWebinarImage.single("webinarImage"),
  updateWebinar
);

// Admin-only: Delete a webinar
router.delete(
  "/admin/webinars/:id",
  protect,
  authorizeRoles("admin"),
  deleteWebinar
);

export default router;
