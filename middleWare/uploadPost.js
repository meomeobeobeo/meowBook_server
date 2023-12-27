import mime from 'mime'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { uploadFileGoogleDrive } from '../function/googleApi/googleApi'
import * as folderId from '../function/googleApi/googleApiFolderId'

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {}

    if (matches.length !== 3) {
        return new Error('Invalid input string')
    }

    response.type = matches[1]
    response.data = new Buffer(matches[2], 'base64')

    return response
}

export const uploadPost = async (req, res, next) => {
    let imgId = []
    let imgB64Data = req.body.selectedFile
    const subFolder = 'image'
    try {
        var decodedImg = decodeBase64Image(imgB64Data)

        var imageBuffer = decodedImg.data
        var type = decodedImg.type
        var extension = mime.getExtension(type)

        const subName = uuidv4()
        var fileName = `${subName}.` + extension
    } catch (error) {
        console.error(error)
        next()
        return false
    }

    try {
        fs.writeFileSync('./image/' + fileName, imageBuffer, 'utf8')
        let driveId = await uploadFileGoogleDrive(fileName, type, folderId.google_Api_Folder_PostId, subFolder)
        const googleDriveLink = `https://drive.google.com/uc?export=view&id=${driveId}`
        console.log(googleDriveLink)

        imgId.push(fileName)
        req.imgId = imgId
        req.googleDriveId = driveId
        req.googleDriveLink = googleDriveLink
    } catch (err) {
        console.error(err)
    }

    next()
}
