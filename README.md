# 💬 SyncTalk Realtime Chat App

A full-stack real-time chat application where users can register, chat instantly with each other, and view live online/offline status. Built with React, Node.js, and Socket.IO.

🔗 **Live App**:(https://chat-app-1-iqsp.onrender.com) / (https://pegasuschatapp.online/)
---

## 🚀 Features

- 🔐 User Authentication (Register & Login)
- 💬 Realtime 1-on-1 Messaging with Socket.IO
- 🧑‍🤝‍🧑 Online/Offline Status
- 📦 Fully Deployed via Render (Frontend + Backend)
- ⚡ Fast and responsive UI with DaisyUI + Tailwind CSS

---

## 🛠️ Tech Stack

**Frontend**  
- React (Vite)
- Tailwind CSS + DaisyUI  
- Axios  
- Socket.IO Client  

**Backend**  
- Node.js + Express  
- MongoDB + Mongoose  
- Socket.IO  
- JWT (for auth)  
- Cookie-based Session Handling  

**Deployment**  
- 🔥 Render (Frontend & Backend)

---

## 📁 Project Structure

```
/client         # React Frontend
  ├── src
  ├── components
  └── pages

/server         # Express Backend
  ├── controllers
  ├── models
  ├── routes
  ├── socket
  └── index.js
```

---

## ⚙️ Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env   # Configure MONGO_URI and JWT_SECRET
npm run dev
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

By default:
- Frontend runs at `http://localhost:5173`
- Backend runs at `http://localhost:5001`

---

## 🔐 Environment Variables (Backend)

Create a `.env` file inside the `server` folder:

```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## 🚀 Deployment on Render

### 🔹 Backend
- Create a new Web Service
- Set build command: `npm install`
- Set start command: `npm run dev` or `node index.js`
- Add environment variables (same as your `.env`)
- Enable web socket support

### 🔹 Frontend
- Create another Web Service for the client
- Set build command: `npm install && npm run build`
- Set start command: `serve -s dist` (use `serve` package)
- Set `vite.config.js` to use correct backend URL in production

Example:

```js
baseURL: import.meta.env.MODE === 'development'
  ? 'http://localhost:5001/api'
  : 'https://your-backend-service.onrender.com/api'
```

---
🧪 Upcoming Features

- ✅ Group Chats
- ✅ Message Read Status
- ✅ Push Notifications
- ✅ Chat Search
- ✅ Typing Indicator


## 🤝 Contributing

1. Fork this repository
2. Create a new branch: `git checkout -b feature/feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to your branch: `git push origin feature/feature-name`
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Rati Ranjan Sendha**  (Pegasus X)
