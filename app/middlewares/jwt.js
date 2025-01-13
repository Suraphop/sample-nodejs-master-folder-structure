// const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// const envFile = `.env.${process.env.NODE_ENV || 'development'}`;

// // Load environment variables
// dotenv.config({ path: envFile });

class JWT {
  //create jwt toketn for Sign in
  async createToken(emp_no, role, level) {
    const token = jwt.sign(
      { emp_no: emp_no, role: role, level: level },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    return token;
  }

  // Middleware to verify JWT token
  async verifyToken(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1]; // Get token from Authorization header

    if (!token) {
      return res.status(403).json({ result: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Add user info to request
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      return res.status(401).json({ result: "Invalid or expired token" });
    }
  }
  // Middleware to check if user is a regular production
  async isWarehouse(req, res, next) {
    if (req.user.role !== "warehouse") {
      return res.status(403).json({ result: "Access denied." });
    }
    next(); // If the user is a regular user or an admin, proceed to the next route handler
  }

  // Middleware to check if user is a regular warehouse or production
  async isWarehouseOrProduction(req, res, next) {
    if (req.user.role !== "warehouse" && req.user.role !== "production") {
      return res
        .status(403)
        .json({ result: "Access denied. Warehouse user only." });
    }
    next(); // If the user is a regular user or an admin, proceed to the next route handler
  }
}

module.exports = new JWT();
