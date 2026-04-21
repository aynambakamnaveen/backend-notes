import jwt from "jsonwebtoken";
const protect = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Login Required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETE);

    if (!decoded?.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
export default protect;