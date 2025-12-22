// routes/speakerRoutes.js
import express from "express";

import {
  getSpeakers,
  getActiveSpeakers,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
} from "../controllers/speakerController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { uploadSpeakerProfileImage } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public — Get All Speakers
router.get("/speakers", getSpeakers);

// Public — Get Active Speakers
router.get("/speakers/active", getActiveSpeakers);

// Admin — Create Speaker
router.post(
  "/admin/speakers",
  protect,
  authorizeRoles("admin"),
  uploadSpeakerProfileImage.single("speakerProfilePicture"),
  createSpeaker
);

// Admin — Update Speaker
router.put(
  "/admin/speakers/:id",
  protect,
  authorizeRoles("admin"),
  uploadSpeakerProfileImage.single("speakerProfilePicture"),
  updateSpeaker
);

// Admin — Delete Speaker
router.delete(
  "/admin/speakers/:id",
  protect,
  authorizeRoles("admin"),
  deleteSpeaker
);

export default router;
