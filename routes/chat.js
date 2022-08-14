import express from 'express';
import {createNewConversation , getConversation , deleteConversation, getMessage, createMessage, deleteMessage} from '../controllers/chat'
import authMiddleWare from '../middleWare/authMiddleWare';
import { messageUploadImage } from '../middleWare/messageUploadImage';


const chatRouter = express.Router();

chatRouter.get('/conversation/:_id',getConversation)
chatRouter.post('/conversation/:_id',createNewConversation)
chatRouter.delete('/conversation/:conversationId',deleteConversation)


// message
chatRouter.get('/message/:conversationId',getMessage)
chatRouter.post('/message/:conversationId',messageUploadImage,createMessage)
chatRouter.delete('/message/:messageId',deleteMessage)


export default chatRouter
