import express from "express";
import {
  createSupportMessage,
  getAllSupportMessages,
  replySupportMessage,
  deleteSupportMessage,
} from "../controllers/supportController.js";

const router = express.Router();

// =======================
// Support Routes
// =======================

// Public – Submit support query
router.post("/support-message", createSupportMessage);

// Admin – Get all / filter by status
router.get("/support-message", getAllSupportMessages);

// Admin – Reply via email
router.post(
  "/support-message/:id/reply",
  replySupportMessage
);

// Admin – Hard delete ticket
router.delete(
  "/support-message/:id",
  deleteSupportMessage
);

export default router;