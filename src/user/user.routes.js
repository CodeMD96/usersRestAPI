const { Router } = require("express");
const userRouter = Router();
const {
    addUser,
    listUser,
    updateUser,
    deleteUser,
    login,
    cancelAccount
  } = require("./user.controllers");
const { hashPassword, tokenCheck } = require("../middleware");

userRouter.post("/user", hashPassword, addUser);
userRouter.get("/user/:username", listUser);
userRouter.put("/user", updateUser);
userRouter.delete("/user/:username", deleteUser);
userRouter.post("/user/login", login);
userRouter.get("/user", tokenCheck, login);
userRouter.delete("/user", cancelAccount);

module.exports = userRouter;