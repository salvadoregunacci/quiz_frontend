import mongoose from "mongoose";

const AchievementSchema = new mongoose.Schema();

export default mongoose.model("Achievement", AchievementSchema);