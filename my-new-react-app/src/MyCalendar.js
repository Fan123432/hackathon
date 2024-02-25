import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// 设置本地化器
const localizer = momentLocalizer(moment);

// 假设这个组件接收一个名为events的props，包含了所有日历事件
function MyCalendar({ events }) {
  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '100vh', margin: '50px' }} // 设置高度和边距
      views={['month', 'week', 'day']} // 允许用户在月视图、周视图和日视图之间切换
    //   defaultView="month" // 默认显示月视图
        view='day'
    />
  );
}

export default MyCalendar;
