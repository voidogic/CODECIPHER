# CodeCipher - Real-Time Collaborative Code Editor

A powerful real-time collaborative code editor built with React, Node.js, and Socket.io. Multiple users can join the same room and edit code together in real-time, with support for multiple programming languages and live compilation.

## 🚀 Features

- **Real-time Collaboration**: Multiple users can edit code simultaneously
- **Multi-language Support**: Python, Java, C++, JavaScript, C#, PHP, Go, Rust, and more
- **Live Code Compilation**: Execute code directly in the browser
- **Room-based Sessions**: Create or join rooms with unique IDs
- **User Management**: See who's currently in the room
- **Modern UI**: Beautiful, responsive interface with dark theme
- **Code Synchronization**: Automatic code sync when users join/leave
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **CodeMirror 5** - Code editor with syntax highlighting
- **Socket.io Client** - Real-time communication
- **React Router** - Client-side routing
- **React Hot Toast** - User notifications
- **Bootstrap 5** - UI framework
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing
- **JDoodle API** - Code compilation service

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/yourusername/codecipher.git
cd codecipher
```

### Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
JDOODLE_CLIENT_ID=your_jdoodle_client_id
JDOODLE_CLIENT_SECRET=your_jdoodle_client_secret
PORT=5000
```

### Frontend Setup
```bash
cd client
npm install
```

## 🚀 Running the Application

### Start the Backend Server
```bash
cd server
npm start
```
The server will run on `http://localhost:5000`

### Start the Frontend
```bash
cd client
npm start
```
The client will run on `http://localhost:3000`

## 🎯 Usage

1. **Start the Application**: Open `http://localhost:3000` in your browser
2. **Enter Username**: Enter your username to join
3. **Create/Join Room**: 
   - Create a new room (generates unique room ID)
   - Join existing room (enter room ID)
4. **Start Coding**: 
   - Select programming language
   - Start typing code
   - See real-time updates from other users
5. **Compile Code**: Use the compiler panel to run your code

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the server directory:

```env
# JDoodle API Credentials (for code compilation)
JDOODLE_CLIENT_ID=your_client_id
JDOODLE_CLIENT_SECRET=your_client_secret

# Server Configuration
PORT=5000
```

### Getting JDoodle API Credentials
1. Visit [JDoodle API](https://www.jdoodle.com/api)
2. Sign up for a free account
3. Get your Client ID and Client Secret
4. Add them to your `.env` file

## 📁 Project Structure

```
codecipher/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Editor.js  # Code editor component
│   │   │   ├── EditorPage.js # Main editor page
│   │   │   ├── Home.js    # Landing page
│   │   │   └── Client.js  # User list component
│   │   ├── Actions.js     # Socket event constants
│   │   ├── Socket.js     # Socket connection setup
│   │   └── App.js        # Main app component
│   └── package.json
├── server/                # Node.js backend
│   ├── index.js          # Main server file
│   ├── Actions.js        # Server-side event constants
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Socket Events

#### Client → Server
- `join` - Join a room
- `code-change` - Send code changes
- `sync-code` - Sync code to new user

#### Server → Client
- `joined` - User joined room
- `code-change` - Receive code changes
- `disconnected` - User left room

### HTTP Endpoints
- `POST /compile` - Compile and execute code

## 🎨 Supported Languages

- **Python 3** - Python programming
- **Java** - Java development
- **C++** - C++ programming
- **C** - C programming
- **JavaScript (Node.js)** - Server-side JavaScript
- **C#** - C# development
- **PHP** - PHP scripting
- **Go** - Go programming
- **Rust** - Rust programming
- **Swift** - Swift development
- **R** - R statistical computing
- **Ruby** - Ruby scripting
- **Scala** - Scala programming
- **Bash** - Shell scripting
- **SQL** - Database queries
- **Pascal** - Pascal programming

## 🚀 Deployment

### Using Heroku

1. **Prepare for deployment**:
```bash
# Install dependencies
cd server && npm install
cd ../client && npm install

# Build the client
cd client && npm run build
```

2. **Create Heroku app**:
```bash
heroku create your-app-name
```

3. **Set environment variables**:
```bash
heroku config:set JDOODLE_CLIENT_ID=your_client_id
heroku config:set JDOODLE_CLIENT_SECRET=your_client_secret
```

4. **Deploy**:
```bash
git push heroku main
```

### Using Vercel (Frontend) + Railway (Backend)

1. **Deploy Backend to Railway**:
   - Connect your GitHub repo
   - Set environment variables
   - Deploy

2. **Deploy Frontend to Vercel**:
   - Connect your GitHub repo
   - Set build command: `cd client && npm run build`
   - Set output directory: `client/build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Socket.io](https://socket.io/) for real-time communication
- [CodeMirror](https://codemirror.net/) for the code editor
- [JDoodle API](https://www.jdoodle.com/api) for code compilation
- [React](https://reactjs.org/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/codecipher/issues) page
2. Create a new issue with detailed description
3. Contact the maintainers

## 🔮 Future Enhancements

- [ ] File upload/download
- [ ] Code syntax highlighting for more languages
- [ ] Chat functionality
- [ ] Code version history
- [ ] User authentication
- [ ] Room persistence
- [ ] Code formatting
- [ ] Collaborative cursors
- [ ] Voice/video calling integration

---

**Happy Coding! 🚀**