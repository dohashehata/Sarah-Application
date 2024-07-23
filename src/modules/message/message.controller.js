import Joi from 'joi';
import mongoose from 'mongoose';
import Message from './message.model.js';

// Add Message

const addMessage = async (req, res) => {
  const { content, receiverId } = req.body;

  const schema = Joi.object({
    content: Joi.string().required(),
    receiverId: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const message = new Message({
      content,
      receiverId: new mongoose.Types.ObjectId(receiverId),
      senderId: new mongoose.Types.ObjectId(req.user.id),
    });

    await message.save();
    res.status(201).send('Message added successfully');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


// Read Messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ receiverId: req.user.id });
    res.json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Delete Message
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).send('Message not found');

    if (message.receiverId.toString() !== req.user.id) {
      return res.status(403).send('Access denied');
    }

    await Message.deleteOne({ _id: req.params.id });
    res.send('Message deleted successfully');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

export { addMessage, getMessages, deleteMessage };

