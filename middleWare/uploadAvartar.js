// import multer from "multer";
// import { v4 as uuidv4 } from 'uuid'



// const dir = '../image/'
// const storage = multer.diskStorage({
//     destination: (req, res, cb) => {
//         cb(null, dir)
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, uuidv4() + '-' + fileName)
//     }

// })
// var uploadImage = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });

// export const uploadPost =async (req, res,next) => {
//     console.log(req.body);
//     let upload = uploadImage.single('selectedFile')
//     upload(req , res, function (err){
//         if (req.fileValidationError) {
//             return  console.log(req.fileValidationError);
//         }
//         else if (!req.file) {
//             return  console.log('Please select an image to upload');
//         }
//         else if (err instanceof multer.MulterError) {
//             return  console.log(err);
//         }
//         else if (err) {
//             return  console.log(err);
//         }
//     });







//     next();
// }




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

