import Conversations from "../model/Messenger/Conversation";
import Messages from "../model/Messenger/Message";


export const getConversation = async (req, res) => {
    try {
        const conversation = await Conversations.find({ members: { $in: [req.params._id] } })
        if (!conversation) {
            res.status(404).json('can not find conversation')


        }
        else {
            res.status(200).json(conversation)
        }

    } catch (error) {
        console.log(error)


        res.status(500).json(error)

    }

}

export const createNewConversation = async (req, res) => {
    const { senderId, receiverId } = req.body
    try {
        const conversation = await Conversations.find({ members: [req.params._id, receiverId] })
        const shiftConversation = await Conversations.find({ members: [ receiverId ,req.params._id] })
      
        if (conversation.length !==0 || shiftConversation.length !==0) {
            console.log('conversation is valid')
            res.json(conversation)
            return false
        }
        else {
            console.log('create new conversation')
            const newConversation = new Conversations({ members: [senderId, receiverId] })
            newConversation.save()
            res.status(200).json(newConversation)
        }





    } catch (error) {
        console.log(error)

    }

}
export const deleteConversation = async (req, res) => {
    try {

        if (req.params.conversationId) {
            await Conversations.findByIdAndRemove(req.params.conversationId)
            console.log('conversation deleted successfully.')
            res.json({ message: "conversation deleted successfully." });
        }



    } catch (error) {
        console.log(error)
        res.status(500)
    }
}
export const getMessage = async (req, res) => {
    const { conversationId } = req.params
    try {
        const messages = await Messages.find({ conversationId: conversationId })
        res.json(messages)

    } catch (error) {
        console.error(error)
        res.status(500)

    }
}
export const createMessage = async (req, res) => {

    const { conversationId } = req.params
    const newMessageData = req.body
    const listGoogleDriveLink  = req.listGoogleDriveLink
    const listImgIds = req.listImgIds
    const listGoogleDriveId = req.listGoogleDriveId
   


    try {
        const newMessage = new Messages({ ...newMessageData, images: listGoogleDriveLink, conversationId: conversationId, listImgIds: listImgIds , listGoogleDriveId:listGoogleDriveId})
        newMessage.save()
        console.log(newMessage)
        res.json(newMessage)

    } catch (error) {
        console.error(error)
        res.status(500).json(error)

    }
}
export const deleteMessage = async (req, res) => {
    const { messageId } = req.params

    try {
        await Messages.findOneAndRemove({ messageId: messageId })
        console.log('message deleted successfully.')
        res.json({ message: "message deleted successfully." });


    } catch (error) {
        console.error(error)
        res.status(500).json(error)

    }

}
