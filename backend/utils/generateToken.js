import jwt from "jsonwebtoken";

// This function will create a JWT token for a user
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,   // 👈 add role
      email: user.email, // 👈 add email (optional)
    },
    process.env.JWT_SECRET, // Secret key from .env file
    {
      expiresIn: "30d", // Token valid for 30 days
    }
  );
};

export default generateToken;
