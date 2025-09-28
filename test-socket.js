const { io } = require('socket.io-client');

console.log('Testing socket connection...');

const socket = io('http://localhost:5000', {
  forceNew: true,
  transports: ['websocket', 'polling'],
  timeout: 5000
});

socket.on('connect', () => {
  console.log('✅ Socket connected successfully:', socket.id);
  socket.emit('join', { roomId: 'test-room', username: 'test-user' });
});

socket.on('connect_error', (error) => {
  console.error('❌ Socket connection error:', error);
});

socket.on('disconnect', (reason) => {
  console.log('🔌 Socket disconnected:', reason);
});

socket.on('joined', (data) => {
  console.log('👥 Joined room:', data);
});

socket.on('code-change', (data) => {
  console.log('📝 Code change received:', data);
});

// Test code change
setTimeout(() => {
  if (socket.connected) {
    console.log('📤 Sending test code change...');
    socket.emit('code-change', { roomId: 'test-room', code: 'console.log("Hello World");' });
  }
}, 2000);

// Clean up after 10 seconds
setTimeout(() => {
  console.log('🧹 Cleaning up...');
  socket.disconnect();
  process.exit(0);
}, 10000);
