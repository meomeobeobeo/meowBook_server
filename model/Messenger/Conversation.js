import mongoose from "mongoose";
const {Schema} = mongoose;

const ConversationSchema = new Schema({
    members: {
        type : [String],
        default : []
    },
    createdAt : {
        type : Date,
        default : new Date(),
    }

})

const Conversations = mongoose.model('conversation',ConversationSchema)


export default Conversations;