
import mime from 'mime'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';




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


    images.forEach(image => {


        try {

            var decodedImg = decodeBase64Image(image);
            var imageBuffer = decodedImg.data;
            var type = decodedImg.type;
            var extension = mime.getExtension(type);
            var subName = uuidv4()
            var fileName = `${subName}.` + extension;
        } catch (error) {
            console.error(error);
            next()
            return false;

        }


        try {
            fs.writeFileSync("./messageImage/" + fileName, imageBuffer, 'utf8');
            listFileName.push(fileName);
            listImgId.push(fileName)

        }
        catch (err) {
            console.error(err)
        }






    })
    let host = process.env.hostName
    const listFullFileName = listFileName.map((fileName) => {
        return `${host}/messageImage/${fileName}`

    })
    req.listFullFileName = listFullFileName
    req.listImgIds = listImgId











    next()
}

