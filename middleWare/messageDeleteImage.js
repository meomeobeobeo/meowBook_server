import fs from 'fs'
import mongoose from 'mongoose'
import { deleteFileGoogleDrive } from '../function/googleApi/googleApi'
import Messages from '../model/Messenger/Message'
import PostMessage from '../model/postMessage'

const deleteImage = (imgPath) => {
    fs.stat(imgPath, function (err, stats) {
        // console.log(stats);
        //here we got all information of file in stats variable

        if (err) {
            return console.error(err)
        }

        fs.unlink(imgPath, function (err) {
            if (err) return console.log(err)
            console.log('file deleted successfully')
        })
    })
}

export const messageDeleteImage = async (req, res, next) => {
    if (req.params.messageId) {
        const { messageId } = req.params

        const data = (await Messages.findOne({ messageId: messageId }))._doc
        const listImgIds = data.listImgIds
        const listGoogleDriveId = data.listGoogleDriveId

        // check id Of image need delete
        const imgPaths = listImgIds.map((id, index) => {
            return `./messageImage/${id}`
        })

        for (let i = 0; i < imgPaths.length; i++) {
            deleteImage(imgPaths[i])
        }
        for (const driveId of listGoogleDriveId) {
            deleteFileGoogleDrive(driveId)
        }
    }

    next()
}
