import { json } from "express";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { userId: recieverId } = req.params;
        console.log(req.params.userId)
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] },
        });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            });
        }
        const newMessage = new Message({
            senderId,
            recieverId,
            message
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(), newMessage.save()]);
        res.status(201).json(newMessage);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }

}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const sanderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [sanderId, userToChatId] }
        }).populate("messages");
        if (!conversation) return res.status(200), json([]);
        const messages = conversation.messages;
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })

    }
}