const express = require("express");
const router = express.Router();
const passport = require("../util/passport");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  registerDemoClient,
  deleteUser,
} = require("./users-controller");
const rateLimit = require("express-rate-limit");
const { authorizeAdmin } = require("../util/auth-middleware");
const { checkId } = require("../util/check-id-middleware");

function getUserInfo(req) {
  return {
    email: req.user.email,
    type: req.user.type,
  };
}

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
});

router.post(
  "/register",
  registerLimiter,
  registerDemoClient,
  passport.authenticate("local"),
  (req, res) => {
    res.json(getUserInfo(req));
  }
);

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(getUserInfo(req));
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ message: "Logged out successfully" });
  });
  // res.json({ message: "Logged out successfully" });
});

router.get("/check", (req, res) => {
  const isAuthenticated = req.isAuthenticated();
  const authInfo = { isAuthenticated };
  if (isAuthenticated) {
    authInfo.userInfo = getUserInfo(req);
  }
  res.json(authInfo);
});

router
  .route("/api/v2/users")
  .all(authorizeAdmin)
  .get(getUsers)
  .post(createUser);

router
  .route("/api/v2/users/:id")
  .all(authorizeAdmin, checkId)
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
