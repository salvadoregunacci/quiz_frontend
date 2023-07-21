import {body} from "express-validator";
import Question from "../models/Question.js";
import Category from "../models/Category.js";

export function createQuestionsValidator() {
    return [
        body("category", "Категория не может быть пустой").notEmpty(),
        body("category").custom(async val => {
            const existCat = await Category.findById(val);
            return Boolean(existCat);
        }).withMessage("Такой категории не существует"),
        body("question", "Вопрос не может быть пустой строкой").notEmpty(),
        body("question", "Вопрос не может быть длиннее 255 символов").optional().isLength({max: 255}),
        body("question").custom(async val => {
            const existQuest = await Question.findOne({question: val});

            if (existQuest) {
                throw new Error("Такой вопрос уже существует");
            }

            return true;
        }),
        body("answers", "Варианты ответов должны быть в виде массива").isArray({min: 1}),
        body("correctAnswer", "Вариант ответа не может быть пустой строкой").notEmpty(),
        body("correctAnswer", "Вариант ответа должен быть числом").isNumeric(),
    ]
}

export function updateQuestionsValidator() {
    return [
        body("title", "Заголовок не может быть пустым").optional().notEmpty(),
        body("type", "Категория не может быть пустой").optional().notEmpty(),
        body("question", "Вопрос не может быть пустой строкой").optional().notEmpty(),
        body("question", "Вопрос не может быть короче 5 символов").optional().isLength({min: 5}),
        body("question", "Вопрос не может быть длиннее 255 символов").optional().isLength({max: 255}),
        body("answers", "Варианты ответов должны быть в виде массива").optional().isArray({min: 1}),
        body("correctAnswer", "Вариант ответа не может быть пустой строкой").optional().notEmpty(),
    ]
}