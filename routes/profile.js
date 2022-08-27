import express from 'express';
import {changeProfileAvartar , getUserData , followUser, filterUser} from '../controllers/userProfile'
import authMiddleWare from '../middleWare/authMiddleWare';
import {uploadAvatar} from '../middleWare/uploadAvartar'
import {deleteOldAvatar} from '../middleWare/deleteOldAvartar'


const profileRoute = express.Router()
profileRoute.post('/changeAvartar/:_id',authMiddleWare,deleteOldAvatar,uploadAvatar,changeProfileAvartar)

// profileRoute.post('/changeAvartar/:_id',authMiddleWare,uploadAvatar,changeProfileAvartar)

profileRoute.get('/getUserData/:_id', getUserData )
profileRoute.get('/filter/:searchText',filterUser)
profileRoute.patch('/follow/:followUserId',authMiddleWare,followUser)



export default profileRoute