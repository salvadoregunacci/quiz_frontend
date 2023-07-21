import Router from "express";
import CategoryController from "../controllers/CategoryController.js";
import multer from "multer";
import {createCatValidator, updateCatValidator} from "../validations/category.js";

const upload = multer();
export const categoryRouter = new Router();

categoryRouter.get("/", CategoryController.getAll);
categoryRouter.get("/:id", CategoryController.getOne);
categoryRouter.post("/", upload.any(), ...createCatValidator(),  CategoryController.create);
categoryRouter.patch("/:id", upload.any(), ...updateCatValidator(),  CategoryController.update);
categoryRouter.delete("/:id", CategoryController.delete);