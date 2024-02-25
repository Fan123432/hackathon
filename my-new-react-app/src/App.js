import React, { useEffect, useState } from 'react';
import './App.css';
import AddEventForm from './AddEventForm';
import MyCalendar from './MyCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function App() {
  const [currentView, setCurrentView] = useState('month');

  const [events, setEvents] = useState([]); // 初始为空数组

  // 在组件加载时从后端API获取事件数据
  useEffect(() => {
    fetch('http://localhost:3000/api/events')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setEvents(data); // 使用从API获取的事件数据更新状态
      })
      .catch(error => console.error("Failed to fetch events:", error));
  }, []); // 空依赖数组表示这个effect只在组件加载时运行一次

  // 处理添加新事件的函数
  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    // 这里你可能还需要向后端发送POST请求来保存新添加的事件
  };

  const handleDeleteLastEvent = async () => {
    console.log('Attempting to delete the last event');
    try {
      const response = await fetch('http://localhost:3000/api/events/last', { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response; // 如果后端返回了被删除事件的数据
      console.log('Last event deleted', data);

      // 更新状态以移除最后一个事件
      setEvents(currentEvents => {
        const updatedEvents = currentEvents.slice(0, -1);
        console.log('Updated events:', updatedEvents);
        return updatedEvents;
      });
    } catch (error) {
      console.error('Failed to delete last event:', error);
    }
  };


  return (
    <div className="App">
      <AddEventForm onAddEvent={handleAddEvent} />
      <MyCalendar events={events} defaultView={currentView} />
      {/* 添加删除最后一个事件的按钮 */}
      <button onClick={handleDeleteLastEvent}>Delete Last Event</button>
    </div>
  );
}

export default App;
