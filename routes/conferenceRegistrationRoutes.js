// routes/conferenceRegistrationRoutes.js

import express from "express";
import {
  registerToConference,
  getUserConferenceRegistrations,
} from "../controllers/conferenceRegistrationController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register user to conference
router.post(
  "/conference/register",
  protect,
  authorizeRoles("user"),
  registerToConference
);

// Get all conferences registered by a user
router.get(
  "/conference/registrations/:userId",
  protect,
  authorizeRoles("user"),
  getUserConferenceRegistrations
);

export default router;
