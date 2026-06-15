import mongoose from "mongoose";

const tweetSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
        type: String,
        required: true
    },
    tweet: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model("Tweet", tweetSchema)