import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { app, server, io } = require('./lib/socket.js');
const path = require('path');
dotenv.config();
const __dirname = path.resolve();

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

const authRoutes = require('./routes/auth.route.js');
const messageRoutes = require('./routes/message.routes.js');
const { connectDB } = require('./lib/db.js');

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../FrontEnd/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../FrontEnd/dist/index.html'));
  });
}

const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log('Server is running on ' + port);
  connectDB();
});
