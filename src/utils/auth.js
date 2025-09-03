import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

// Hash password
export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

// Verify password
export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT
export function generateToken(paylodad, time) {
  const token = jwt.sign(paylodad, JWT_SECRET, { expiresIn: time });
  return token;
}

// Verify JWT
export function verifyToken(token) {
  const payload = jwt.verify(token, JWT_SECRET); // token data, including the user id
  return payload;
}
