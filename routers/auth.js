const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", login);
router.get("/me", protect, getMe);
router.get("/updatedetails", protect, updateDetails);
router.post("/updatepassword", protect, updatePassword);
router.post("/forgotPassword", forgotPassword);
router.get("/resetPassword/:resetToken", resetPassword);

module.exports = router;
