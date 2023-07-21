import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    preview: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    frazes: {
        type: [
            {
                type: String,
            }
        ]
    },
    bonus_rating: {
        type: Number,
        default: 0
    }
}, {
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.id = doc._id;
            delete ret.password;
            delete ret._id;
            delete ret.__v;
        }
    }
});

export default mongoose.model("Item", ItemSchema);