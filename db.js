const mongoose = require('mongoose');

// 修改为你的实际数据库名
const mongoURI = 'mongodb://localhost:27017/MyCalendarApp';

// 连接到MongoDB数据库
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose;
