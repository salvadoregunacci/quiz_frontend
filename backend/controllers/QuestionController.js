import {validationResult} from "express-validator";
import Question from "../models/Question.js";

class QuestionController {
    async create(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    ...errors
                });
            }

            const newQuestion = await Question.create({
                question: req.body.question,
                category: req.body.category,
                answers: req.body.answers,
                correctAnswer: +req.body.correctAnswer
            });

            res.status(200).json(newQuestion);
        } catch (err) {
            res.status(500).json({
                message: "Что-то пошло не так",
                error: err
            })
        }
    }

    async getAll(req, res) {
        try {
            const byCategory = req.query["category"];
            let items;

            if (byCategory) {
                items = await Question.find({category: byCategory}).populate("category", "title").exec();
            } else {
                items = await Question.find().populate("category", "title").exec();
            }

            if (!items) res.status(404).json({message : "Вопросы не найдены"});

            res.status(200).json(items);
        } catch (err) {
            res.status(500).json({
                message: "Что-то пошло не так",
                error: err
            });
        }
    }

    async getOne(req, res) {

    }

    async update(req, res) {

    }

    async delete(req, res) {

    }
}

export default new QuestionController();