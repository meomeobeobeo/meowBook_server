import jwt , {decode} from 'jsonwebtoken'



const authMiddleWare = async (req, res, next) => {
    try {
        const tokenId = req.headers.authorization.split(' ')[1]
        if(!tokenId) {
            res.sendStatus(401).send('Not authenticated');
            return false;
        }
        const isCustomAuth = tokenId.length <500 
       let verifyData = jwt.verify(tokenId,process.env.hashPassword)
       if(!verifyData){
        res.sendStatus(403)
        return false
       }
       req.userId = verifyData.id
        // let decodedData
        // if(tokenId && !isCustomAuth) {
        //     decodedData =jwt.verify(tokenId , 'meotrangbeo')
        //     console.log(decodedData)
        //     req.userId = decodedData?.id
        //     console.log(userId)

        // }
        // else {
        //     decodedData = jwt.decode(tokenId);
        //     req.userId = decodedData?.id;

        // } 
        next()
    

    } catch (error) {
        console.log(error)
        res.sendStatus(401)
    }
}
export default authMiddleWare