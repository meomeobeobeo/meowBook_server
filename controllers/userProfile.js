// user profile contain avatarUrl , setUp , information of user 

// route /profile 
import Users from "../model/user";
import PostMessage from "../model/postMessage";
import mongoose from "mongoose";

// GET profile/getUserData/:${id} (_id in mongoDb server)
export const getUserData = async (req, res) => {

    const {_id} = req.params
    console.log(_id)
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No user with id: ${_id}`);

    try {
        

        const currentUserData = (await Users.findById(_id))._doc

       


        

        res.status(200).json(currentUserData)


    } catch (error) {
        res.status(500)
        console.error(error)

    }
}





// POST /profile/changeAvartar/:userId(_id in mongodb server )
export const changeProfileAvartar = async (req, res, next) => {
    

    try {

        const avartarFile = req.createImage
        const hostName = `https://meow-book-server.herokuapp.com`
        const imgLink = `${hostName}/avatar/${avartarFile}`


        if (!req.userId) {
            res.status(401);// not authentication
            return false;// not authenticated

        }


        const currentUserData = (await Users.findById(req.userId))
        currentUserData.imgIds.push(req.imgId[0])
        currentUserData.listAvatarUrl.push(imgLink)




        const newUserData = { ...currentUserData._doc, avatarUrl: imgLink }

        const update = await Users.findByIdAndUpdate(req.userId, newUserData, { new: true })
       
       
       
       
       
        // update link new avatarUrl to all post of userId
        const posts = await PostMessage.find({ authorId: req.userId })
        const listPostNeedChange = posts.map((post) => {

            return post._id
        })
        
        // lop to change AuthoravatarUrl
        for(let i = 0; i < listPostNeedChange.length; i++) {
            let lastPost = posts[i]._doc
            let newPost = {
                ...lastPost,
                authorAvatarUrl: imgLink
            }
            
            let updated = await PostMessage.findByIdAndUpdate(listPostNeedChange[i]  , newPost , {new : true});
          
            
        }
        






        res.json(update._doc);


    } catch (error) {
        res.status(500)
        console.error(error);

    }
}
export const followUser = async (req, res)=>{
    if (!req.userId) {
        res.status(401);// not authentication
        return false;// not authenticated

    }

    const { followUserId} = req.params;
    try {
        const userInfor = await Users.findById(req.userId)
      
        const index = userInfor.friendList.findIndex((id) => id === followUserId);
        if (index === -1) {
            // follow the user
            userInfor.friendList.push(followUserId);
        }
        else {
            // unfollow User
            userInfor.friendList = userInfor.friendList.filter((id) => id !== String(followUserId))
        }


        const updated = await Users.findByIdAndUpdate(req.userId ,userInfor, { new : true})
        res.json(updated)






    } catch (error) {
        console.error(error)
        
    }




    

}