import mongoose  from "mongoose";
const {Schema} = mongoose


const postSchema = new Schema({
    title :String,
    message : String,
    name : String,
    authorId : String,
    authorAvatarUrl : String,
    tags : [String],

    selectedFile : String,
    imgId : {
        type :[String],
        default : []
    },
    googleDriveId :{
        type :String,
        default:''

    },
    likes : {
        type :[String],
        default : []
    },
    comments : {
        type : [Object],
        default :[] 
    },
    createdAt : {
        type: Date,
        default: new Date(),
    }
})



const PostMessage = mongoose.model('postMessage',postSchema)
export default PostMessage