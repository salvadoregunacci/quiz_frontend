import Item from "../models/Item.js";

class ItemController {
    async getAll(req, res) {
        try {
            const items = await Item.find().sort({price: 1});

            if (!items) {
                return res.status(404).json({
                    message: "Не найдено"
                });
            }

            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({
                message: "Неизвестная ошибка",
                error
            });
        }
    }
}

export default new ItemController();