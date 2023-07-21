import Router from "express";
import QuestionController from "../controllers/QuestionController.js";
import {createQuestionsValidator, updateQuestionsValidator} from "../validations/questions.js";
import multer from "multer";

const upload = multer();
export const questionRouter = new Router();

questionRouter.get("/", QuestionController.getAll);
questionRouter.get("/:id", QuestionController.getOne);
questionRouter.post("/", upload.any(), ...createQuestionsValidator(), QuestionController.create);
questionRouter.patch("/:id", ...updateQuestionsValidator(), QuestionController.update);
questionRouter.delete("/:delete", QuestionController.delete);