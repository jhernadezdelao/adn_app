const { Router } = require("express");
const router = Router();

const authCtrl =require ("../controllers/auth.controller");
const  { verifyToken,isAdmin } = require ("../middlewares/authJwt");
const { checkRolesExisted,checkDuplicateUsernameOrEmail } =require ("../middlewares/verifySignUp");

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/signup",
  [checkDuplicateUsernameOrEmail, checkRolesExisted],
  authCtrl.signUp
);

router.post("/signin", authCtrl.signin);

module.exports= router;