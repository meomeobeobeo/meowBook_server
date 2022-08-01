import fs from 'fs';
import mongoose from 'mongoose';
import Users from '../model/user'



const deleteImage = (imgPath) => {
    fs.stat(imgPath, function (err, stats) {
        // console.log(stats);
        //here we got all information of file in stats variable

        if (err) {
            return console.error(err);
        }

        fs.unlink(imgPath, function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
        });
    });
}





export const deleteOldAvatar = async (req, res, next) => {



       const currentUserData = (await Users.findById(req.userId))._doc
        const {imgIds} = currentUserData
      

        // check id Of image need delete 
        const imgPaths = imgIds.map((id , index) => {
            return `./avatar/${id}`
        }) 
      

        for(let i = 0; i < imgPaths.length; i++) {
            deleteImage(imgPaths[i])
        }   





    










    next();
}
