const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    title: String,
    caption: String,
    imageUrl: String,
    image_id: String,
    userId: Schema.Types.ObjectId,
    date: {
        type: Date,
        dafault: Date.now
    }

})

mongoose.model("Post", postSchema);
