import express from "express";
import {
  getMeetingByWebinar,
  getAllMeetings,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} from "../controllers/meetingController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected – Get meeting by webinar
router.get(
  "/meetings/:webinarId",
  protect,
  getMeetingByWebinar
);

// Admin – Get all meetings
router.get(
  "/admin/meetings",
  protect,
  authorizeRoles("admin"),
  getAllMeetings
);

// Admin – Create meeting
router.post(
  "/admin/meetings/:webinarId",
  protect,
  authorizeRoles("admin"),
  createMeeting
);

// Admin – Update meeting
router.put(
  "/admin/meetings/:id",
  protect,
  authorizeRoles("admin"),
  updateMeeting
);

// Admin – Delete meeting
router.delete(
  "/admin/meetings/:id",
  protect,
  authorizeRoles("admin"),
  deleteMeeting
);

export default router;
