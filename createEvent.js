const Event = require('./Event'); // 确保路径正确

// 创建一个新事件的函数
const createNewEvent = async () => {
  try {
    const newEvent = new Event({
      title: 'My New Event',
      description: 'This is a description of my new event.',
      startTime: new Date('2024-03-01T09:00:00'),
      endTime: new Date('2024-03-01T10:00:00'),
      // userId: '你的用户ID', 如果你实现了用户系统
    });

    // 保存新事件到数据库
    const savedEvent = await newEvent.save();
    console.log('Event created successfully:', savedEvent);
  } catch (err) {
    console.error('Error creating new event:', err);
  }
};

// 调用函数
createNewEvent();
