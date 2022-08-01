import Users from "../model/user";
import mongoose from "mongoose";

/// POST user/friend/:userId
export const addFriend = async (req, res, next) => {
    try {
        const userIdNewFriend = req.body.userId
        if (!req.userId) {
            res.sendStatus(401)
            return false;
        }
        const currentUserInfor = await Users.findById(req.userId)
        console.log(currentUserInfor)
        const index = currentUserInfor.friendList.findIndex((personId) => personId === String(userIdNewFriend))
        if (index === -1) {
            // add friend
            currentUserInfor.friendList.push(userIdNewFriend)
        }
        else {
            // unFriend 
            currentUserInfor.friendList = currentUserInfor.friendList.filter(friendId => friendId !== userIdNewFriend)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)

    }


}