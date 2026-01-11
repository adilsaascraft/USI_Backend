import express from "express";
import {
  sendEmailToAttendedUsers,
  sendEmailToNotAttendedUsers,
} from "../controllers/webinarEmailController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/admin/webinar/:webinarId/email/attended",
  protect,
  authorizeRoles("admin"),
  sendEmailToAttendedUsers
);

router.post(
  "/admin/webinar/:webinarId/email/not-attended",
  protect,
  authorizeRoles("admin"),
  sendEmailToNotAttendedUsers
);

export default router;
