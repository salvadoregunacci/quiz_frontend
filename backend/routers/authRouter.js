import Router from "express";
import UserController from "../controllers/UserController.js";
import {loginValidator, registerValidation, updateValidator} from "../validations/auth.js";
import checkAuth from "../middlewares/checkAuth.js";
import multer from "multer";
import User from "../models/User.js";

export const authRouter = new Router();
const upload = multer();

authRouter.get("/", UserController.getAll);
authRouter.get("/achievements", checkAuth, UserController.getAchievements);
authRouter.get("/unlock_cats", checkAuth, UserController.getUnlockCats);
authRouter.get("/items", checkAuth, UserController.getItems);
authRouter.get("/:id", UserController.getOne);
authRouter.post("/", UserController.create);
authRouter.patch("/", checkAuth, upload.any(), ...updateValidator(), UserController.update);
authRouter.delete("/:id", UserController.delete);

authRouter.get("/auth/me", checkAuth, UserController.getMe);
authRouter.get("/auth/reset_account", checkAuth, UserController.resetAccount);
authRouter.post("/auth/login", ...loginValidator(), UserController.login);
authRouter.post("/auth/register", ...registerValidation(), UserController.register);

