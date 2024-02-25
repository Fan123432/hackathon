import React, { useState } from 'react';

function AddEventForm({ onAddEvent }) { // 添加一个新的prop来处理事件的添加
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });
  const [successMessage, setSuccessMessage] = useState(''); // 添加成功消息的状态
  const [errorMessage, setErrorMessage] = useState(''); // 添加错误消息的状态

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 表单验证: 确保所有字段都被填写
    if (!formData.title || !formData.startTime || !formData.endTime) {
      setErrorMessage('All fields are required.');
      return; // 如果任一字段为空，则不处理表单提交
    }
  
    // 创建一个新的事件对象，用于添加到日历
    const newEvent = {
      title: formData.title,
      description: formData.description, // 确保你包含了所有需要发送的字段
      start: formData.startTime,
      end: formData.endTime,
    };
  
    try {
      // 使用 fetch 发送 POST 请求到后端 API
      const response = await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });
  
      if (!response.ok) {
        // 如果响应状态码不是 2xx，抛出错误
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json(); // 解析JSON响应
      console.log('Success:', data);
  
      // 在这里调用 onAddEvent(newEvent) 可能不再需要，除非你还需要在前端进行额外处理
      // onAddEvent(newEvent);
  
      setSuccessMessage('Event added successfully.'); // 显示成功消息
      setErrorMessage(''); // 清除任何之前的错误消息
  
      // 清空表单
      setFormData({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to add event. Please try again.'); // 显示错误消息
      setSuccessMessage(''); // 清除任何之前的成功消息
    }
  };  

  return (
    <form onSubmit={handleSubmit}>
      {/* 显示成功或错误消息 */}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* 表单输入字段 */}
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="startTime">Start Time:</label>
        <input
          id="startTime"
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="endTime">End Time:</label>
        <input
          id="endTime"
          type="datetime-local"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Event</button>
    </form>
  );
}

export default AddEventForm;
