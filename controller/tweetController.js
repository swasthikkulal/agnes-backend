import tweetModel from "../model/tweetModel.js"

// createTweet  - > Image, tweet = req.body
//  create tweet inside tweetModel
//  save tweet
//  res


// getAllUsers,
// getTweetByID
// deleteTweet,
// updateTweet

export const createTweet = async (req, res) => {
    try {
        const { tweet } = req.body;
        const imagePath = req.file.filename;
        const id = req.user.id;
        const create = await tweetModel.create({
            userId : id,
            image : imagePath,
            tweet
        })
        await create.save()
        res.json({ success: true, message: "tweet created", data: create })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}