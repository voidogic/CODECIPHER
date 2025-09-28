# 🚀 CodeCipher

CodeCipher is a collaborative coding platform enabling real-time code sharing, editing, and execution across multiple programming languages. Perfect for developers, educators, and teams to streamline remote interviews, pair programming, and coding practice.

---

## 📋 Project Overview

CodeCipher provides a seamless environment for collaborative coding with live chat, code execution, and multi-language support. Users can create rooms, invite collaborators, and work together in real time.

---

## ✨ Features

- 📝 Real-time collaborative code editor
- 💬 Integrated chat for communication
- ⚡ Live code execution for multiple languages
- 🔒 Secure room creation and management
- 🌐 Multi-user support
- 📊 Syntax highlighting and error reporting
- 🔄 Socket-based live updates

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js  
- Redux  
- Socket.io-client  
- Tailwind CSS

**Backend:**  
- Node.js  
- Express.js  
- Socket.io  
- MongoDB  
- REST API

**Deployment:**  
- Backend: [Render](https://render.com/)  
- Frontend: [Vercel](https://vercel.com/)

---

## 🛠️ Installation Guide (Local Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codecipher.git
   cd codecipher
   ```

2. **Install dependencies**
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file in the `server` folder:
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:3000
   ```

4. **Run the application**
   - Start backend:
     ```bash
     cd server
     npm start
     ```
   - Start frontend:
     ```bash
     cd client
     npm start
     ```

---

## 🚦 Usage Instructions

- Visit your deployed frontend on Vercel.
- Register or log in.
- Create or join a coding room.
- Start collaborating and executing code!

---

## ⚙️ Configuration

- **Backend Environment Variables:**  
  - `MONGO_URI`: MongoDB connection string  
  - `JWT_SECRET`: Secret for JWT authentication  
  - `CLIENT_URL`: Frontend URL  
  - `PORT`: Server port (default: 5000)

- **Frontend Environment Variables:**  
  - `REACT_APP_API_URL`: Backend Render URL

---

## 📁 Project Structure

```
codecipher/
├── client/         # React frontend
│   ├── src/
│   └── public/
├── server/         # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── sockets/
├── README.md
└── .env
```

---

## 📡 API Documentation

### Socket Events

- `joinRoom`: Join a coding room
- `codeUpdate`: Broadcast code changes
- `chatMessage`: Send/receive chat messages
- `runCode`: Execute code and return output

### HTTP Endpoints

- `POST /api/auth/register`: Register user
- `POST /api/auth/login`: Login user
- `GET /api/rooms`: List rooms
- `POST /api/rooms`: Create room

---

## 🌍 Supported Languages

- JavaScript
- Python
- Java
- C++
- C#
- Ruby
- Go
- PHP
- TypeScript

---

## 🚀 Deployment Guide

### Backend on Render

1. Push your backend code to GitHub.
2. Create a new Web Service on Render.
3. Set the root directory to `server`.
4. Set build command: `npm install`
5. Set start command: `node index.js`
6. Add environment variables in Render dashboard.
7. Deploy.

### Frontend on Vercel

1. Push your frontend code to GitHub.
2. Create a new project on Vercel.
3. Set the root directory to `client`.
4. Set environment variable `REACT_APP_API_URL` to your Render backend URL.
5. Deploy.

---

## 🤝 Contributing Guidelines

- Fork the repository
- Create a new branch (`feature/your-feature`)
- Commit your changes
- Open a pull request
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)

---

## 🔮 Future Enhancements

- 🧑‍💻 Video/audio chat integration
- 📱 Mobile app support
- 🏆 Coding challenges and leaderboards
- 🛡️ Enhanced security features
- 🌐 More language support
- 📊 Analytics dashboard

---