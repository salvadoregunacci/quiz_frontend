import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
        question: {
            type: String,
            unique: true,
            required: true
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            required: true
        },
        answers: [{type: String, required: true}],
        correctAnswer: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    });

export default mongoose.model("Question", QuestionSchema);