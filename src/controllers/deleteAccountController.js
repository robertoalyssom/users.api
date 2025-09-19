import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function deleteAccount(req, res) {
  try {
    const reqUserId = req.user.id;
    const deleteUser = await prisma.userAccount.delete({
      where: {
        id: reqUserId,
      },
    });

    // Clear refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "Lax",
      path: "/",
    });

    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete account error:", err);
    return res.status(500).json({ error: "Error deleting account" });
  }
}
