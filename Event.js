const mongoose = require('./db'); // 引入db.js来使用同一个mongoose连接

// 定义事件Schema
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  // userId: { type: mongoose.Schema.Types.ObjectId, required: false } 如果你有用户系统
}, { timestamps: true });

// 创建模型
const Event = mongoose.model('Event', eventSchema);

// 导出模型
module.exports = Event;
