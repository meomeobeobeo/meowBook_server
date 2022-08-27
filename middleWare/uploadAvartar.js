
import mime from 'mime'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';




function decodeBase64Image(dataString) {
    console.log(dataString)
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
    let imgId = []
    let imgB64Data = req.body.dataImg
   
    var decodedImg = decodeBase64Image(imgB64Data);
    var imageBuffer = decodedImg.data;
    var type = decodedImg.type;
    var extension = mime.getExtension(type);
    const subName = uuidv4()

    var fileName = `${subName}.` + extension;

    
    try {
        fs.writeFileSync("./avatar/" + fileName, imageBuffer, 'utf8');
        req.createImage = fileName;
        imgId.push(fileName);
        req.avatarId = imgId
        req.imgId = imgId
         
    }
    catch (err) {
        console.error(err)
    }







    next()
}

