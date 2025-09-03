import express from "express";
import {
  getContacts,
  createContact,
  deleteContact,
  updateContact,
} from "../controllers/contactsController.js";

const router = express.Router();

router.post("/contacts", createContact);
router.get("/contacts", getContacts);
router.put("/contacts/:id", updateContact);
router.delete("/contacts/:id", deleteContact);

export default router;
