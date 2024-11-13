const { verify, TokenExpiredError } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("Authorization")?.split(" ")[1]; // Extract token from the Authorization header

  // Bypass token validation for the refresh token route
  if (req.path === "/auth/token") {
    return next(); // Skip middleware for token refresh route
  }

  if (!accessToken)
    return res.status(401).json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    if (validToken) {
      req.user = validToken; // Attach decoded token to the request (contains user info)
      return next();
    }
  } catch (err) {
    // Check if the error is due to token expiration
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" }); // Notify client about expiration
    } else {
      return res.status(403).json({ error: "Invalid token" });
    }
  }
};

module.exports = { validateToken };
