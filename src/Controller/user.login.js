import User from '../Models/user.model.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const jwt_secrete = process.env.JWT_SECRETE

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const finduser = await User.findOne({ email });

    if (!finduser) {
      return res.status(401).json({ message: "User not found" });
    }

    const checkpass = await bcrypt.compare(password, finduser.password);

    if (!checkpass) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: finduser._id,username: finduser.username },
      jwt_secrete
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true
    });

    res.status(200).json({
      message: "Login Successful",
      user: {
        id: finduser._id,
        email: finduser.email,
        username: finduser.username
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export default login;