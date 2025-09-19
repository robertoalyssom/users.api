import { PrismaClient } from "@prisma/client";
import { comparePassword, generateToken } from "../utils/auth.js";

const prisma = new PrismaClient();

/**
 * Login controller: Authenticates user and issues tokens
 */
export async function login(req, res) {
  try {
    // Destructure credentials from request body
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const userAccount = await prisma.userAccount.findUnique({
      where: { email },
    });
    if (!userAccount) return res.status(404).json({ error: "User not found" });

    // Validate password
    const isValidPsw = await comparePassword(password, userAccount.password);
    if (!isValidPsw) return res.status(401).json({ error: "Invalid password" });

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
    return res.status(200).json({ user: userAccount, token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
