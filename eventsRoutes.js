const express = require('express');
const router = express.Router();
const Event = require('./Event'); // 确保路径正确

// POST /api/events - 创建一个新事件
router.post('/events', async (req, res) => {
  try {
    const { title, description, startTime, endTime } = req.body;
    const newEvent = new Event({
      title,
      description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      // userId: req.body.userId, 如果你实现了用户系统
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error creating new event', error: error.toString() });
  }
});

module.exports = router;
