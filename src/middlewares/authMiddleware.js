import { verifyToken } from "../utils/auth.js";

/**
 * This middleware checks for the user access token when the client uses contacts routes. It creates a req.user object with the user id
 */
export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Misssing Authorization header" });
  }

  // Expecting header format: Bearer <token>
  const token = authHeader.split(" ")[1]; // this separates the token from Bearer
  if (!token) return res.status(401).json({ error: "There is no token!" });

  try {
    const decodedToken = verifyToken(token);
    // create 'req.user' and pass it to the next middleware, or controller
    req.user = decodedToken;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "token_expired", message: "Access token expired." });
    }

    return res.status(201).json({ error: "Invalid token!", token: token });
  }
}
