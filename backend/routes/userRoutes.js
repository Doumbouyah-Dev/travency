import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getUsers,
  deleteUser,
  updateUserRole,
  register, 
  login, 
  googleLogin, 
  updateUserProfile 
} from "../controllers/userController.js";


const router = express.Router();

// POST /api/users/register
router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.get("/profile", protect, async (req, res) => {
  res.status(200).json(req.user);
});
router.get("/admin/users", protect, admin, async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
// Only Admins can manage users
router.route("/").get(protect, admin, getUsers);
router.route("/:id").delete(protect, admin, deleteUser);
router.route("/:id").put(protect, admin, updateUserRole);
router.route("/profile").put(protect, updateUserProfile);


router.put("/profile", protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });

    if (req.body.avatar) {
  user.avatar = req.body.avatar;
}
  } else {
    res.status(404);
    throw new Error("User not found");
  }
}));


export default router;

