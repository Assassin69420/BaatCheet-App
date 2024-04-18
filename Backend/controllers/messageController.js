import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res ) => {
    try {
        const { message } = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await conversation.save();
        await newMessage.save();

        //await Promise.all([conversation.save(), newMessage.save()]); this the the alternative for the above 2 lines

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(200).json(newMessage)
    } catch (error) {
        res.status(404).json({ message: "internal server error"})
    }
}

export const getMessage = async (req, res) => {
    try {
        const {id: userChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId,userChatId]},
        }).populate("messages");

        if (!conversation) {
            return res.status(404).json([])
        }

        res.status(200).json(conversation.messages);

    } catch (error) {
        res.status(404).json({ error: "internal server error"})
        console.log(error);
    }
}