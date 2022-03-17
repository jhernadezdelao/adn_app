
   
const { Router } =require("express");
const router = Router();

const  usersCtrl =require("../controllers/user.controller");

const  { verifyToken,isAdmin } = require ("../middlewares/authJwt");  
const { checkRolesExisted,checkDuplicateUsernameOrEmail } =require ("../middlewares/verifySignUp");

router.post(
  "/",
  [
    verifyToken,
    isAdmin,
    checkDuplicateUsernameOrEmail,
  ],
  usersCtrl.createUser
);

module.exports=router;