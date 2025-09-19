/**
 * Logout controller: Clears refresh token cookie
 */
export default function logout(req, res) {
  try {
    // Clear refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      path: "/",
    });
    // Respond with success message
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    // Log error for debugging
    console.error("Logout error:", err);
    return res.status(500).json({ error: "Logout failed" });
  }
}
