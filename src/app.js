import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import signupRoutes from "./routes/signupRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import logoutRoutes from "./routes/logoutRoutes.js";
import contactsRoutes from "./routes/contactsRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import refreshRoutes from "./routes/refreshRoutes.js";

/*
 * Global settings
 */

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://user-registration-eight-liard.vercel.app/"],
    credentials: true, // allow cookies to be sent with the request
  })
);
app.use(cookieParser());

// Routes
app.use("/auth", signupRoutes);
app.use("/auth", loginRoutes);
app.use("/auth", logoutRoutes);
app.use("/auth", refreshRoutes);
app.use("/auth", authMiddleware, contactsRoutes);

// Global error handler

export default app;
