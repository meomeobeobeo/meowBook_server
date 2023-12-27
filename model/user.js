import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    id: { type: String },
    avatarUrl: { type: String, default: '' },
    friendList: {
        type: [String],
        default: [],
    },
    imgIds: {
        type: [String],
        default: [],
    },
    googleDriveId: { type: String, default: '' },

    listConversations: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const Users = mongoose.model('users', userSchema)

export default Users
