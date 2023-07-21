import {body} from "express-validator";
import Category from "../models/Category.js";

export function createCatValidator() {
    return [
        body("title", "Название категории не может быть пустым").notEmpty(),
        body("title").custom(async (val) => {
            const dublicat = await Category.findOne({title: val});

            if (!dublicat) {
                return true;
            }

            throw new Error("Такая категория уже существует");
        })
    ]
}

export function updateCatValidator() {
    return [
        body("title", "Название категории не может быть пустым").optional().notEmpty(),
        body("title").optional().custom(async (val) => {
            const dublicat = await Category.findOne({title: val});

            if (!dublicat) {
                return true;
            }

            throw new Error("Такая категория уже существует");
        })
    ]
}