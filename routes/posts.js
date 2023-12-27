import express from 'express'
import {
    getPosts,
    createPost,
    editPost,
    deletePost,
    likePost,
    addComment,
    editComment,
    deleteComment,
} from '../controllers/posts.js'
import authMiddleWare from '../middleWare/authMiddleWare'
import { uploadPost } from '../middleWare/uploadPost.js'
import { deleteOldImage } from '../middleWare/deleteOldImage'

const postsRoute = express.Router()
postsRoute.get('/', getPosts)
postsRoute.post('/', authMiddleWare, uploadPost, createPost)
postsRoute.patch('/:_id', authMiddleWare, deleteOldImage, uploadPost, editPost)
postsRoute.delete('/:_id', authMiddleWare, deleteOldImage, deletePost)
postsRoute.post('/:_id/addComment', authMiddleWare, addComment)

postsRoute.patch('/:_id/likePost', authMiddleWare, likePost)
postsRoute.patch('/:_id/:commentId', authMiddleWare, editComment)
postsRoute.delete('/:_id/:commentId', authMiddleWare, deleteComment)

// postsRoute.post('/:_id/editComment',authMiddleWare,editComment)
// postsRoute.post('/:_id/deleteComment',authMiddleWare,deleteComment)

export default postsRoute
