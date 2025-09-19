import express from "express";
import deleteAccount from "../controllers/deleteAccountController.js";

const router = express.Router();

router.delete("/deleteAccount", deleteAccount);

export default router;
