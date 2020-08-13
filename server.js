const express = require('express');
const socket = require('socket.io');

const app = express();

let tasks = [];

const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.emit('updateData', tasks);
  socket.on('addTask', (data) => {
    tasks.push(data);
    socket.broadcast.emit('addTask', data);
  });
  socket.on('removeTask', (id) => {
      tasks = tasks.filter(task => task.id != id);
      socket.broadcast.emit('removeTask', id);
  });
});
