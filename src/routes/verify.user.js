import express from "express";
import register from '../Controller/user.register.js'
import login from '../Controller/user.login.js'
import protect from '../Middleware/middleware.js'
const router2 = express.Router()

router2.post('/login',login)

router2.post('/register',register)

router2.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});
router2.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });
  res.json({ message: "Logged out successfully" });
});

export default router2;