import express from "express";
import { captureWebinarAttendance } from "../controllers/webinarAttendanceController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User clicks webinar (attendance capture)
router.post(
  "/webinar/:webinarId/attend",
  protect,
  authorizeRoles("user"),
  captureWebinarAttendance
);

export default router;
