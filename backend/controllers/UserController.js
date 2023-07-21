import {validationResult} from "express-validator";
import User from "../models/User.js";
import Item from "../models/Item.js";
import Achievement from "../models/Achievement.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as fs from "fs";
import {fileIsImage} from "../utils.js";
import util from "util";
import sharp from "sharp";

class UserController {
    async getAll(req, res) {
        try {
            const sort = req.query.sort ? req.query.sort : null;
            const limit = req.query.limit ? req.query.limit : null;

            const users = await User.find().sort({ [sort] : -1}).limit(limit).select("name avatar rating email").exec();

            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({
                message: "Неизвестная ошибка",
                error
            });
        }
    }

    async getOne(req, res) {
        res.status(200).json({
            message: "Получили одного"
        })
    }

    async create(req, res) {

        res.status(200).json({
            message: "Создали юзера"
        })
    }

    async getAchievements(req, res) {
        const achievements = await User.findById(req.userId).populate("achievements").select("achievements").exec();

        if (!achievements) {
            return res.status(200).json([]);
        }

        res.status(200).json([...achievements.achievements]);
    }

    async getUnlockCats(req, res) {
        const unlockCategories = await User.findById(req.userId).populate("unlockCategories").select("unlockCategories").exec();

        if (!unlockCategories) {
            return res.status(200).json([]);
        }

        res.status(200).json([...unlockCategories.unlockCategories]);
    }

    async getItems(req, res) {
        try {
            const user = await User.findById(req.userId);

            if (!user) {
                return res.status(404).json({
                    message: "Пользователь не найден"
                })
            }

            const items = await User.findById(req.userId).populate("items").select("items").exec();

            res.status(200).json(items.items);
        } catch (error) {
            res.status(500).json({
                message: "Неизвестная ошибка",
                error
            })
        }


    }

    async update(req, res) {
        const err = validationResult(req);
        const id = req.userId;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден"
            })
        }

        if (!err.isEmpty()) {
            return res.status(400).json({
                errors: err["errors"]
            });
        }

        let file = req.files;
        let fileName;
        let filePath;

        if (file) {
            const unlinkAsync = util.promisify(fs.unlink);
            let oldAvatar;

            file = file[0];
            fileName = Date.now() + "-" + file.originalname;
            filePath = req.protocol + "://" + req.get("host") + "/public/images/avatars/" + fileName;

            if (user.avatar) {
                oldAvatar = user.avatar.split("/avatars/")[1];
            }

            if (!fileIsImage(file)) {
                return res.status(400).json({
                    message: "Можно загружать только фото"
                })
            }

            if (user.avatar) {
                await unlinkAsync(`public/images/avatars/${oldAvatar}`);
            }

            const resizedImage = await sharp(file.buffer)
                .resize(250)
                .toBuffer();

            fs.writeFileSync(`public/images/avatars/${fileName}`, Buffer.from(resizedImage.buffer));
        }

        if (req.body.name) {
            user.name = req.body.name;
        }

        if (filePath) {
            user.avatar = filePath;
        }

        if ("coins" in req.body) {
            user.coins = req.body.coins;
        }

        if ("rating" in req.body) {
            user.rating = req.body.rating;
        }

        if (req.body.completeCategories) {
            user.completeCategories = req.body.completeCategories;
        }

        if (req.body["unlockCategory"] && !user["unlockCategories"].includes(req.body["unlockCategory"])) {
            user["unlockCategories"].push(req.body["unlockCategory"]);
        }

        if (req.body.achievements && !user.achievements.includes(req.body.achievements)) {
            user.achievements.push(req.body.achievements);
        }

        if (req.body.item && !user.items.includes(req.body.item)) {
            user.items.push(req.body.item);
        }

        await user.save();

        res.status(200).json(user);
    }

    async resetAccount(req, res) {
        try {
            const user = await User.findById(req.userId);

            user.coins = 0;
            user.rating = 0;
            user.completeCategories = [];
            user.achievements = [];
            user.items = [];
            user.unlockCategories = [];

            await user.save();

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message: "Произошла неизвестная ошибка",
                error
            });
        }
    }

    async delete(req, res) {
        res.status(200).json({
            message: "Удалили юзера"
        })
    }

    async getMe(req, res) {
        try {
            const user = await User.findById(req.userId);

            if (!user) {
                return res.status(404).json({
                    message: "Пользователь не найден"
                })
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message: "Что-то пошло не так",
                error
            })
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    ...errors
                })
            }

            let user = await User.findOne({email: req.body.email});

            if (!user) {
                return res.status(404).json({
                    message: "Пользователь не найден"
                })
            }

            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({
                    message: "Неверный логин или пароль"
                })
            }

            const token = jwt.sign(
                {id: user.id},
                "private123",
                {expiresIn: "30d"}
            );

            res.status(200).json({
                user,
                token
            });
        } catch (err) {
            res.status(500).json({
                message: "Что-то пошло не так",
            })
        }
    }

    async register(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    ...errors
                })
            }

            const salt = await bcrypt.genSalt(5);
            const passwordHash = await bcrypt.hash(req.body.password, salt);

            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: passwordHash,
            });

            if (!newUser) {
                return res.status(400).json({
                    message: "Не удалось создать пользователя"
                })
            }

            const token = jwt.sign(
                {
                    id: newUser._id
                },
                "private123",
                {
                    expiresIn: "30d"
                });

            res.status(200).json({
                createUser: newUser,
                token
            });
        } catch (err) {
            res.status(500).json({
                message: "Что-то пошло не так",
                errors: err
            })
        }
    }
}

export default new UserController();