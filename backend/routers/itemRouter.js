import Router from "express";
import checkAuth from "../middlewares/checkAuth.js";
import ItemController from "../controllers/ItemController.js";

export const itemRouter = new Router();

itemRouter.get("/", ItemController.getAll);