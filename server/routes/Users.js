const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const { sign, verify } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password, role } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      role: role, // Save the role (student or teacher)
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    return res.json({ error: "User Doesn't Exist" });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      return res.json({ error: "Wrong Password" });
    }

    // Generate access token and refresh token
    const accessToken = sign(
      { username: user.username, id: user.user_id, role: user.role },
      "importantsecret",
      { expiresIn: "15m" } // Access token valid for 15 minutes
    );

    const refreshToken = sign(
      { username: user.username, id: user.user_id, role: user.role },
      "refreshsecret", // Use a different secret for the refresh token
      { expiresIn: "7d" } // Refresh token valid for 7 days
    );

    // Return both tokens to the client
    res.json({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  });
});

router.post("/token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  // Verify the refresh token
  verify(refreshToken, "refreshsecret", (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    // Generate a new access token
    const newAccessToken = sign(
      { username: user.username, id: user.id, role: user.role },
      "importantsecret",
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  });
});

// router.get("/auth", validateToken, (req, res) => {
//   res.json(req.user); // User object will contain the role
// });

module.exports = router;
