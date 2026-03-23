const express = require("express");
const router = express.Router();

// TEMP login (we improve later with DB + JWT)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    res.json({
      message: "Login successful",
      token: "dummy-token-123"
    });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

module.exports = router;