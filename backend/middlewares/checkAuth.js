import jwt from "jsonwebtoken";
import User from "../models/User.js";

async function checkAuth(req, res, next) {
    try {
        const token = req.get("Authorization") ? req.get("Authorization").replace(/Bearer\s?/, "").trim() : "";

        if (token) {
            const {id} = jwt.verify(token, "private123");
            req.userId = id;
            next();
        } else {
            return res.status(403).json({
                message: "Нет прав доступа"
            })
        }
    } catch {
        return res.status(404).json({
            message: "Неизвестный токен",
        })
    }
}

export default checkAuth;