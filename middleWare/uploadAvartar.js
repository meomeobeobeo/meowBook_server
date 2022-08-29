
import mime from 'mime'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import { uploadFileGoogleDrive } from '../function/googleApi/googleApi';
import * as folderId from '../function/googleApi/googleApiFolderId'



function decodeBase64Image(dataString) {

    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}



export const uploadAvatar = async (req, res, next) => {

    let imgB64Data = req.body.dataImg

    var decodedImg = decodeBase64Image(imgB64Data);
    var imageBuffer = decodedImg.data;
    var type = decodedImg.type;
    var extension = mime.getExtension(type);
    const subName = uuidv4()
    const subFolder = 'avatar'

    var fileName = `${subName}.` + extension;// name of file image 


    try {

        fs.writeFileSync("./avatar/" + fileName, imageBuffer, 'utf8');
        console.log(fileName);
        let driveId = await uploadFileGoogleDrive(fileName, type, folderId.google_Api_Folder_avatar, subFolder)
        console.log(driveId);
        const googleDriveLink = `https://drive.google.com/uc?export=view&id=${driveId}`





        req.imgId = subName
        req.fileName = fileName
        req.googleDriveLink = googleDriveLink
        req.driveId = driveId
        console.warn('pass uploadAvatar')
        


    }
    catch (err) {
        console.warn('fail uploadAvatar')
        console.error(err)
    }







    next()
}

