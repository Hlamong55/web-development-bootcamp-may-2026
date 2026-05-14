const Message = require("../models/Message");

const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    const messages = await Message.find({
      $or: [
        {
          senderId,
          receiverId,
        },

        {
          senderId: receiverId,
          receiverId: senderId,
        },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getMessages,
};
