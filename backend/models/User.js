import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    achievements: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Achievement",
        }
    ],
    items: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Item",
            }
        ],
        default: []
    },
    role: {
        type: String,
        default: "USER",
    },
    completeCategories: {
        type: [
            {
                cat: {
                    type: mongoose.Types.ObjectId,
                    ref: "Category"
                },
                bestResult: {
                    type: Number,
                    default: 0,
                }
            }
        ],
        default: []
    },
    unlockCategories: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Category"
            }
        ],
        default: []
    },
    coins: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
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

export default mongoose.model("User", UserSchema);