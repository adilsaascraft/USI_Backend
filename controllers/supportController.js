import SupportData from "../models/SupportData.js";
import { generateSupportTicketNumber } from "../utils/generateSupportTicket.js";
import sendEmailWithTemplate from "../utils/sendEmail.js";

/* =======================
   Create Support Message
======================= */
export const createSupportMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required",
      });
    }

    // ==============================
    // CHECK LAST TICKET
    // ==============================
    const lastTicket = await SupportData.findOne({ email }).sort({
      createdAt: -1,
    });

    if (lastTicket) {
      // If already resolved → allow immediately
      if (lastTicket.status === "OPEN") {
        const now = new Date();
        const created = new Date(lastTicket.createdAt);

        const diffHours =
          (now.getTime() - created.getTime()) / (1000 * 60 * 60);

        if (diffHours < 24) {
          const remaining = Math.ceil(24 - diffHours);

          return res.status(400).json({
            message: `You can raise next ticket after ${remaining} hour(s) or wait until current ticket is resolved.`,
            lastTicketNumber: lastTicket.supportTicketNumber,
          });
        }
      }
    }

    // ==============================
    // CREATE NEW TICKET
    // ==============================
    let supportTicketNumber;
    let exists = true;

    while (exists) {
      supportTicketNumber = generateSupportTicketNumber();
      exists = await SupportData.exists({ supportTicketNumber });
    }

    await SupportData.create({
      name,
      email,
      message,
      supportTicketNumber,
      status: "OPEN",
      isRead: false,
    });

    res.status(201).json({
      message: "Support request submitted successfully",
      supportTicketNumber,
    });
  } catch (error) {
    console.error("Create support message error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


/* =======================
   Get Support Messages
   ?status=OPEN|RESOLVED
======================= */
export const getAllSupportMessages = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) {
      filter.status = status.toUpperCase();
    }

    const messages = await SupportData.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Support messages fetched successfully",
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Get support messages error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


/* =======================
   Reply to Support Ticket
======================= */
export const replySupportMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { replyMessage } = req.body;

    if (!replyMessage) {
      return res.status(400).json({
        message: "Reply message is required",
      });
    }

    const ticket = await SupportData.findById(id);
    if (!ticket) {
      return res.status(404).json({
        message: "Support ticket not found",
      });
    }

    await sendEmailWithTemplate({
      to: ticket.email,
      name: ticket.name,
      templateKey: "2518b.554b0da719bc314.k1.b3275a70-040e-11f1-9db9-d2cf08f4ca8c.19c379e8197",
      mergeInfo: {
        TICKET_NUMBER: ticket.supportTicketNumber,
        REPLY_MESSAGE: replyMessage,
      },
    });

    //  AUTO RESOLVE
    ticket.status = "RESOLVED";
    ticket.isRead = true;

    await ticket.save();

    res.status(200).json({
      message: "Reply sent & ticket resolved successfully",
    });
  } catch (error) {
    console.error("Reply support message error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


/* =======================
   Delete Support Ticket
======================= */
export const deleteSupportMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await SupportData.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        message: "Support ticket not found",
      });
    }

    res.status(200).json({
      message: "Support ticket deleted successfully",
    });
  } catch (error) {
    console.error("Delete support message error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
