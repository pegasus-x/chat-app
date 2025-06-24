# Chat App

A full-stack real-time chat application built with Node.js (backend) and React.js (frontend). This project allows users to communicate in real time using WebSockets and provides a responsive UI for an interactive messaging experience.

## 🚀 Features

- Real-time chat using Socket.IO
- User authentication
- Chat rooms / private messaging
- Responsive frontend built with React
- Image sharing with Cloudinary
- RESTful API with Node.js and Express

## 📁 Project Structure

chat-app/
├── backend/ # Node.js + Express + Socket.IO backend
├── frontend/ # React frontend
├── .gitignore
└── package.json # Root dependencies and scripts 

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

---

### 🔧 Backend Setup

```bash
cd backend
npm install
npm run dev
💻 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm start 
The frontend will run on http://localhost:3000 by default.
```
🌐 Technologies Used
Frontend: React, Axios, Socket.IO-client
Backend: Node.js, Express, Socket.IO
Database:MongoDB 
Authentication: JWT 
Media Uploads: Cloudinary

📦 Scripts
From root:

bash
# Install all dependencies
npm install --workspaces

# Start backend & frontend (if set up with concurrently)
npm run dev  
📦 Scripts
From root:

bash
Copy
Edit
# Install all dependencies
npm install --workspaces

# Start backend & frontend (if set up with concurrently)
npm run dev
Make sure to configure workspaces or use individual terminal tabs if not.

📄 License
This project is licensed under the MIT License. See the LICENSE file for more information.

🙌 Acknowledgements
Inspired by popular chat applications

Real-time communication using Socket.IO

📬 Contact
For questions or feedback, feel free to reach out!



