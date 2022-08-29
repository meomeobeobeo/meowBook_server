import * as folder_Id from './googleApiFolderId'
import fs from 'fs'
import {google} from 'googleapis'



export const uploadFileGoogleDrive = async (fileName , mimeType , folderId , subFolder  ) => {

    try {
        const auth = new google.auth.GoogleAuth({
            keyFile : './function/googleApi/meowBookDrive.json',
            scopes :['https://www.googleapis.com/auth/drive']
        })

        const driveServices = google.drive({ 
            version:'v3',
            auth
        })
        const fileMetaData = { 
            'name' : `${fileName}`,/*  @params */
            'parents':[folderId],/*  @params */
        }
// server\image\test.jpg
// server\function\googleApi\googleApi.js
        const media = {
            mimeType:`${mimeType}`,/*  @params */
            body :fs.createReadStream(`../../meowBook/server/${subFolder}/${fileName}`)/*  @params fileName : test.jpg  */
        }

        const response = await driveServices.files.create(
            {
                resource: fileMetaData,
                media: media,
                fields : 'id'
            }
        )
        

        return response.data.id



    } catch (error) {
        console.error('some error   >>>>>>>>')
        console.info(error)
        
    }

}
export const deleteFileGoogleDrive = async (googleDriveId)=>{

    try {
        const auth = new google.auth.GoogleAuth({
            keyFile : './function/googleApi/meowBookDrive.json',
            scopes :['https://www.googleapis.com/auth/drive']
        })

        const driveServices = google.drive({ 
            version:'v3',
            auth
        })
       
        const data = await driveServices.files.delete({
            fileId: googleDriveId // @params fileId 
        })
        console.log('files deleted successfully from drive google')
        
        return data

       

       

       
        

    } catch (error) {
        console.error('some error when delete   >>>>>>>>')
        console.info(error)
     
        
    }

}