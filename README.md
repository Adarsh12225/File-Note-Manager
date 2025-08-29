# 📝 Notes App with Node.js & Express

This is a beginner-friendly **Notes App** built using **Node.js** and **Express.js**.  
It was created as part of my Node.js learning journey to understand the difference between:
- A plain Node.js HTTP server
- An Express-powered server with routes and a simple frontend .
## 🚀 Features
- 📌 Add new notes
- 📂 Fetch all saved notes
- ⚙️ Get system info (process ID, uptime, platform) with artificial delay
- 🌐 REST API tested with Postman
- 🎨 Simple UI (Bootstrap + HTML) to interact with the API
## 🛠️ Tech Stack
- **Node.js (http, fs, path, events, process, timers)**
- **Express.js**
- **Bootstrap** (for frontend UI)
- **Postman** (for API testing)
## 📂 Project Structure
notes-app/
│── index.js # Plain Node.js HTTP server (port 4000)
│── api.js # Express API + UI (port 5000)
│── public/
│ └── index.html # Frontend UI
│── package.json
│── README.md
## ⚡ Installation & Setup
1. Clone the repository:
   git clone https://github.com/your-username/notes-app.git
   cd notes-app
bash
Copy code
npm install express
