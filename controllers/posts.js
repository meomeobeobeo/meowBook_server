import PostMessage from "../model/postMessage"
import mongoose from 'mongoose'











export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();

        res.status(200).json(postMessage);

    } catch (error) {
        res.status(404).json(error);
    }

}


export const createPost = async (req, res) => {


    const imgId = req.imgId
   

    const post = req.body;
    const userId = req.userId
    const imgCreateName = req.createImage
    const hostName = `http://localhost:5000`
    const imgLink = `${hostName}/image/${imgCreateName}`












    const newPost = new PostMessage({ ...post, authorId: userId, selectedFile: imgLink, imgId: imgId })
    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}




// edit post 
export const editPost = async (req, res) => {
    const imgCreateName = req.createImage
    const hostName = `http://localhost:5000`
    const imgLink = `${hostName}/image/${imgCreateName}`




    if (req.params._id) {

        const { _id } = req.params




        const { title, message, authorId, selectedFile, tags, name, authorAvatarUrl } = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);



        const updatedPost = { authorId, title, message, tags, selectedFile: imgLink, _id, name, authorAvatarUrl, imgId: req.imgId };
        /// check authorId is valid to update post

        if (authorId !== req.userId) {
            res.sendStatus(405)
            return false
        }


        try {


            const updated = await PostMessage.findByIdAndUpdate(_id, updatedPost, { new: true });


            res.status(200).json(updated)




        } catch (error) {
            console.error(error);
        }
    }



}
export const deletePost = async (req, res) => {
    if (req.params._id) {
        const { _id } = req.params
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

        try {
            // check userId valid to delete post
            const currentPost = await PostMessage.findById(req.params._id)
            const authorId = currentPost.authorId
            if (authorId !== req.userId) {
                res.sendStatus(405)
                return false

            }


            if (req.params._id) {
                await PostMessage.findByIdAndRemove(req.params._id)
                res.json({ message: "Post deleted successfully." });
            }


        } catch (error) {
            console.error(error);
            res.status(400).json(error);
        }

    }
    else {

    }
}
export const likePost = async (req, res) => {

    try {
        const { _id } = req.params
        if (!req.userId) {
            res.sendStatus(404)
            return false;

        }
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.sendStatus(404)
            return res.status(404).json('no post with id :' + _id)

        }
        const post = await PostMessage.findById(_id)
      
        const index = post.likes.findIndex((id) => id === req.userId)
        if (index === -1) {
            // like the post
            post.likes.push(req.userId);
        }
        else {
            // dislike the post
            post.likes = post.likes.filter((id) => id !== String(req.userId))
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })
        res.json(updatedPost)
    }
    catch (error) {
        console.log(error);
    }
}
export const addComment = async (req, res) => {
    try {
        if (!req.userId) {
            res.sendStatus(401)
            return false;

        }
        const idOfPost = req.params._id
        console.log(idOfPost)
        if (!mongoose.Types.ObjectId.isValid(idOfPost)) {
            res.sendStatus(404)
            return res.status(404).json('no post with id :' + idOfPost)

        }
        const commentData = req.body
        console.log(commentData)
        const currentPost = await PostMessage.findById(idOfPost)
        console.log(currentPost._doc)
        currentPost.comments.push(commentData)
        const updated = await PostMessage.findByIdAndUpdate(idOfPost, currentPost, { new: true })


        res.json(commentData)



    } catch (error) {
        console.warn(error);
        res.sendStatus(500)
    }

}


// patch post/:_id/:commentId
export const editComment = async (req, res, next) => {
    const { _id, commentId } = req.params
   
    const newCommentData = req.body


    try {
        if (!req.userId) {
            res.sendStatus(401)
            return false;

        }

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.sendStatus(404)
            return res.status(404).json('no post with id :' + idOfPost)

        }

        const currentPost = (await PostMessage.findById(_id))._doc
        let indexChange = 0
        const commentsArray = currentPost.comments
        for (let i = 0; i < commentsArray.length; i++) {
            if (commentsArray[i].commentId === commentId) {
                indexChange = i
                commentsArray[i].content = newCommentData.content
                commentsArray[i].avatarUrl = newCommentData.avatarUrl
            }
        }
        console.log(commentsArray[indexChange])
        const updatedPost = {
            ...currentPost,
            comments : commentsArray
        }



        const updated = await PostMessage.findByIdAndUpdate(_id, updatedPost, { new: true })
        res.json(commentsArray[indexChange])










    } catch (error) {
        console.error(error)


    }



}
export const deleteComment = async (req, res) => {

    try {
        if (!req.userId) {
            res.sendStatus(401)
            return false;

        }
        const { _id, commentId } = req.params
        
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.sendStatus(404)
            return res.status(404).json('no post with id :' + idOfPost)

        }
        const currentPost = (await PostMessage.findById(_id))._doc
        
        const commentsArray = currentPost.comments
        const newCommentsArray = commentsArray.filter(comment => comment.commentId !== commentId)
        const updatedPost = {
            ...currentPost,
            comments : newCommentsArray
        }



        const updated = await PostMessage.findByIdAndUpdate(_id, updatedPost, { new: true })


        res.json('delete comment success')






        
    } catch (error) {
        
        console.error(error)
        res.status(500)
    }

}