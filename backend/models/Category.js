import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
            required: true
        },
        preview: {
            type: String,
            required: true
        },
        private: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.id = doc._id;
                delete ret._id;
                delete ret.__v
            }
        }
    }
);


export default mongoose.model("Category", CategorySchema);