import { PrismaClient } from "@prisma/client";
import { hashPassword, generateToken } from "../utils/auth.js";

const prisma = new PrismaClient();

/**
 * Signup controller: Creates a new user and issues tokens
 */
export default async function signup(req, res) {
  try {
    const { email, name, password } = req.body;
    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user account
    const userAccount = await prisma.userAccount.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // Generate access and refresh tokens
    const token = generateToken({ id: userAccount.id }, "1m");
    const refreshToken = generateToken({ id: userAccount.id }, "3m");

    // Set refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      path: "/",
    });

    // Respond with user info and access token
    return res.status(201).json({ user: userAccount, token });
  } catch (err) {
    console.error("Signup error:", err);

    // Handle unique email constraint error
    if (err.code === "P2002" && err.meta?.target?.includes("email")) {
      return res.status(409).json({ error: "Email already in use." });
    }
    return res.status(500).json({ error: "Error creating user account" });
  }
}
