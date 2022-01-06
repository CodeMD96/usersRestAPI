const { Router } = require("express");
const userRouter = Router();
const {
    addUser,
    listUser,
    updateUser,
    deleteUser,
    login,
    tokenCheck,
    cancelAccount
  } = require("./user.controllers");
const { hashPassword, decryptPassword } = require("../middleware");

userRouter.post("/user", hashPassword, addUser);
userRouter.get("/user/:username", listUser);
userRouter.put("/user", updateUser);
userRouter.delete("/user/:username", deleteUser);
userRouter.post("/user/login", decryptPassword, login);
userRouter.get("/user", tokenCheck);
userRouter.delete("/user", cancelAccount);

module.exports = userRouter;