import jwt from "jsonwebtoken";
const jwt_secrete = '1d3df0ab22e3d33d821aec03f885da81b80c724c2f8a1e1a78d22e98fcc4d382'
const protect = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Login Required" });
  }

  try {
    const decoded = jwt.verify(token, jwt_secrete);

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