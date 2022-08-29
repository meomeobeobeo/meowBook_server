import mongoose from "mongoose";
const {Schema} = mongoose;

const MessageSchema = new Schema({
    conversationId:{
        type:String,
        
    },
    senderId :{
        type : String,
        default :''
    },
    textMessage :{
        type : String,
        default :''

    },
    likes :{
        type : [String],
        default :[]
    },
    listGoogleDriveId : {
        type : [String],
        default :[]
    },
    images :{
        type :[String],
        default :[]
    },
    listImgIds :{
        type :[String],
        default :[]
    },
    messageId :{
        type: String,
    },


    createdAt : {
        type : Date,
        default : new Date(),
    }

})

const Messages = mongoose.model('messages',MessageSchema)


export default Messages;