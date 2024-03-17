import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  changePassword,
  updateAvatar,
  updateProfile,
  forgotPassword,
  resetPassword,
  sendPromotionMails,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
const router = Router();
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/me").get(verifyJWT, getUser);
router.route("/changePassword").post(verifyJWT, changePassword);
router
  .route("/updateAvatar")
  .post(verifyJWT, upload.single("avatar"), updateAvatar);
router.route("/updateProfile").post(verifyJWT, updateProfile);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").post(resetPassword);
router.route("/sendPromotionMails").post(verifyJWT, sendPromotionMails);
router.route("/refresh-token").post(refreshAccessToken);
export default router;
