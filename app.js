const express = require('express');
const eventsRoutes = require('./eventsRoutes'); // 确保路径正确

const app = express();
// 允许所有来源的跨域请求

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

// 或者，更精细的控制CORS选项
// app.use(cors({
//   origin: 'http://localhost:3002' // 替换为你的前端应用的实际端口
// }));

const port = 3000; // 你可以选择一个合适的端口

app.use(express.json()); // 使Express能够解析JSON请求体
// 使用eventsRoutes中间件，所有的事件路由都会加上前缀`/api`
app.use('/api', eventsRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

  