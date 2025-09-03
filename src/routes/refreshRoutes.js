// Refresh token route

import express from "express";
import refreshTokenController from "../controllers/refreshController.js";

const router = express.Router();

router.get("/refresh", refreshTokenController);

export default router;
