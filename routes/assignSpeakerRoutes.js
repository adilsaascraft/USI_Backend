import express from "express";
import {
  getAssignedSpeakers,
  getSpeakersByWebinar,
  assignSpeaker,
  removeAssignedSpeaker,
} from "../controllers/assignSpeakerController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public – All assigned speakers
router.get("/assign-speakers", getAssignedSpeakers);

// Public – Speakers assigned to a webinar
router.get("/assign-speakers/:webinarId", getSpeakersByWebinar);

// Admin – Assign speaker
router.post(
  "/admin/assign-speakers/:webinarId",
  protect,
  authorizeRoles("admin"),
  assignSpeaker
);

// Admin – Remove assigned speaker
router.delete(
  "/admin/assign-speakers/:id",
  protect,
  authorizeRoles("admin"),
  removeAssignedSpeaker
);

export default router;
