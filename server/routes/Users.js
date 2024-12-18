const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const { sign, verify } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op } = require("sequelize");

// Initialize default admin user
const initializeAdmin = async () => {
  try {
    const adminExists = await Users.findOne({ where: { username: "admin" } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin", 10);
      await Users.create({
        username: "admin",
        password: hashedPassword,
        role: "admin",
        address: "admin",
        email: "admin@admin.com",
        phone: "admin",
        fullname: "Admin User",
        profile_picture: null,
      });
      console.log("Default admin user created.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error creating default admin user:", error);
  }
};

// Call the initialization function
initializeAdmin();

router.post("/", async (req, res) => {
  const { username, password, role, address, email, phoneNumber, fullName } =
    req.body;

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      role: role, // Save the role (student or teacher)
      address: address,
      email: email,
      phone: phoneNumber,
      fullname: fullName,
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

router.get("/", validateToken, async (req, res) => {
  try {
    const user_id = req.user.id;
    const userData = await Users.findOne({ where: { user_id: user_id } });
    res.json(userData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
});

router.delete("/:user_id", validateToken, async (req, res) => {
  try {
    const user_id = req.params.user_id;
    // Check if the user exists
    const user = await Users.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the course itself
    await user.destroy();

    res.json({ message: "User and its related data deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
});

router.put("/", validateToken, async (req, res) => {
  const user_id = req.user.id;
  const { fullname, email, address, phone, profile_picture } = req.body;
  try {
    const user = await Users.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    await Users.update(
      { fullname, email, address, phone, profile_picture },
      { where: { user_id: user_id } }
    );
    const updatedUser = await Users.findByPk(user_id);
    res
      .status(200)
      .json({ message: "User updated successfully.", updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the user infos" });
  }
});

router.get("/get-all", validateToken, async (req, res) => {
  try {
    const userData = await Users.findAll({
      where: {
        role: {
          [Op.or]: ["teacher", "student"],
        },
      },
    });
    res.json(userData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
});

module.exports = router;
