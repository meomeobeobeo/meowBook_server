import mongoose from 'mongoose'
const { Schema } = mongoose

const storiesSchema = new Schema({
    bgColor: {
        type: String,
        default: 'salmon',
    },
    title: {
        type: String,
    },
    colorTitle: {
        type: String,
    },
    name: String,
    authorId: String,
    authorAvatarUrl: String,
    imgUrl: String,
    videoUrl: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const Stories = mongoose.model('stories', storiesSchema)

export default Users
