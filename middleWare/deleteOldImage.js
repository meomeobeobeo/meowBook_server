import fs from 'fs';
import mongoose from 'mongoose';
import PostMessage from '../model/postMessage';



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





export const deleteOldImage = async (req, res, next) => {
    if (req.params._id) {

        const { _id } = req.params
        
        const data = (await PostMessage.findById(_id))._doc
      





        const { title, message, authorId, selectedFile, tags, name, authorAvatarUrl, imgId } = data;
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

       
        /// check authorId is valid to update post
       

        if (authorId !== req.userId) {
            res.sendStatus(405)
            return false
        }

        // check id Of image need delete 
        const imgPaths = imgId.map((id , index) => {
            return `./image/${id}`
        }) 
      

        for(let i = 0; i < imgPaths.length; i++) {
            deleteImage(imgPaths[i])
        }   





    }










    next();
}
