
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



export const messageUploadImage = async (req, res, next) => {
    // let imgId = []
    // let imgB64Data = req.body.selectedFile
    // array of image base64
    const { images } = req.body
    const listFileName = []
    const listImgId = []
    const listGoogleDriveId = []
    const listGoogleDriveLink = []
    const sub = 'messageImage'

    try {
        for (const image of images) {



            var decodedImg = decodeBase64Image(image);
            var imageBuffer = decodedImg.data;
            var type = decodedImg.type;
            var extension = mime.getExtension(type);
            var subName = uuidv4()
            var fileName = `${subName}.` + extension;




            fs.writeFileSync("./messageImage/" + fileName, imageBuffer, 'utf8');
            let driveId = await uploadFileGoogleDrive(fileName, type, folderId.google_Api_Folder_message, sub)
            const googleDriveLink = `https://drive.google.com/uc?export=view&id=${driveId}`
            listGoogleDriveId.push(driveId)
            listGoogleDriveLink.push(googleDriveLink)
            listFileName.push(fileName);
            listImgId.push(fileName)





        }

        let host = process.env.hostName

        req.listGoogleDriveLink = listGoogleDriveLink
        req.listGoogleDriveId = listGoogleDriveId
        req.listImgIds = listImgId

    } catch (error) {
        console.error(error)

    }











    next()
}

