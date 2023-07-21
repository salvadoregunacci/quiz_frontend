import {body} from "express-validator";
import User from "../models/User.js";

export const registerValidation = () => ([
    body("name", "Ник не может быть пустым").notEmpty(),
    body("name").custom(async val => {
        const existName = await User.findOne({name: val});

        if (existName) {
            throw new Error("Ник уже используется");
        }
    }),
    body("email", "Email не может быть пустым").notEmpty(),
    body("email", "Неправильный формат email").isEmail(),
    body("email").custom(async val => {
        const existEmail = await User.findOne({email: val});

        if (existEmail) {
            throw new Error("Email уже используется");
        }
    }),
    body("password", "Пароль не может быть пустой").notEmpty(),
    body("password", "Пароль не может быть короче 5 символов").isLength({min: 5})
]);

export const loginValidator = () => ([
    body("email", "Email не может быть пустым").notEmpty(),
    body("password", "Пароль не может быть пустым").notEmpty(),
]);

export const updateValidator = () => ([
    body("name").optional().notEmpty().withMessage("Имя не может быть пустым"),
    body("coins").optional().isNumeric().withMessage("Coins могут быть только числом"),
    body("rating").optional().isNumeric().withMessage("Рейтинг может быть только числом"),
    body("achievements").optional().notEmpty().withMessage("Achievements не может быть пустым"),
    body("unlockCategory").optional().notEmpty().withMessage("unlockCategory не может быть пустым"),
]);

export const updateBestResult = ()=> ([
    body("index").notEmpty().withMessage("Индекс не может быть пустым").isNumeric().withMessage("Индекс должен быть числом"),
    body("bestResult").notEmpty().withMessage("Результат не может быть пустым").isNumeric().withMessage("Результат должен быть числом")
]);