const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// 使用body-parser和cors中间件
app.use(bodyParser.json());
app.use(cors());

// 连接到你的MongoDB数据库
mongoose.connect('mongodb://localhost:27017/myEventsDb');

// 创建事件模型
const Event = mongoose.model('Event', new mongoose.Schema({
  title: String,
  description: String,
  start: Date,
  end: Date
}));

// API端点
app.post('/api/events', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// app.delete('/api/events/:id', async (req, res) => {
//   try {
//     const deletedEvent = await Event.findByIdAndDelete(req.params.id);
//     if (!deletedEvent) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.status(200).json(deletedEvent);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

app.delete('/api/events/last', async (req, res) => {
    try {
    //   在MongoDB中，你可以使用 sort 来找到最新的事件
      const lastEvent = await Event.findOne().sort({ _id: -1 });
      
      if (lastEvent) {
        await Event.findByIdAndDelete(lastEvent._id);
        res.status(200).send('Last event deleted');
      } else {
        res.status(404).send('No events found');
      }
    } catch (error) {
      res.status(500).send('Error deleting last event');
    }
  });

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
