import Category from "../models/Category.js";
import * as fs from "fs";
import {validationResult} from "express-validator";
import * as util from "util";
import {fileIsImage} from "../utils.js";

class CategoryController {
    async create(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    ...errors
                });
            }


            const file = req.files[0];
            const fileName = Date.now() + "-" + file?.originalname;
            const filePath = req.protocol + "://" + req.get("host") + "/public/images/" + fileName;


            if (file) {
                if (!fileIsImage(file)) {
                    return res.status(400).json({
                        message: "Можно загружать только фото"
                    })
                }

                fs.writeFileSync(`public/images/${fileName}`, file.buffer, (err) => {
                    if (err) throw err;
                });
            }

            const newCat = await Category.create({
                title: req.body.title,
                preview: filePath,
                private: req.body.private ? req.body.private : false
            });

            res.status(200).json(newCat);
        } catch (error) {
            res.status(500).json({
                message: "Что-то пошло не так",
                error
            })
        }
    }

    async getAll(req, res) {
        try {
            const cats = await Category.find();

            if (!cats) {
                return res.status(404).json({
                    message: "Категории не найдены"
                })
            }

            res.status(200).json(cats);
        } catch (err) {
            res.status(500).json({
                message: "Что то пошло не так",
                error: err
            })
        }
    }

    async getOne(req, res) {

    }

    async update(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors)
            }

            const id = req.params.id;
            const file = req.files[0];
            let fileName;
            let filePath;


            if (!id) {
                return res.status(400).json({
                    message: "Не указан id записи"
                })
            }

            const doc = await Category.findById(id);

            if (!doc) {
                return res.status(400).json({
                    message: "Не удалось найти запись"
                })
            }

            if (file) {
                const prefixUrl = req.protocol + "://" + req.get("host");
                const unlinkAsync = util.promisify(fs.unlink);
                const oldFileName = doc["preview"].split("/images/")[1];

                fileName = Date.now() + "-" + file.originalname;

                await unlinkAsync(`public/images/${oldFileName}`);

                fs.writeFileSync(`public/images/${fileName}`, file.buffer);
                filePath = prefixUrl + "/public/images/" + fileName;
            }

            const updateDoc = await Category.findOneAndUpdate(
                {_id: id},
                {
                    title: req.body.title || doc["title"],
                    preview: filePath || doc["preview"]
                },
                {new: true}
            );

            res.status(200).json(updateDoc);
        } catch (error) {
            res.status(500).json({
                message: "Что-то пошло не так",
                error
            })
        }
    }

    async delete(req, res) {

    }
}

export default new CategoryController();