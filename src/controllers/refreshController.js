import { PrismaClient } from "@prisma/client";
import { generateToken, verifyToken } from "../utils/auth.js";

const prisma = new PrismaClient();

/**
 * Controller: Refresh Access Token
 * Called by the client when the access token expires.
 */
export default async function refreshTokenController(req, res) {
  const { refreshToken } = req.cookies;

  if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

  try {
    // Validate refresh token
    const decodedToken = verifyToken(refreshToken);

    // Retrieve user from database
    const user = await prisma.userAccount.findUnique({
      where: { id: decodedToken.id },
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Generate new short-lived access token
    const accessToken = generateToken({ id: decodedToken.id }, "3m");

    return res.status(201).json({ token: accessToken, user });
  } catch (err) {
    console.log(err);

    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }
}
