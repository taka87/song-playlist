# 🎵 React Songs Manager

A **React application** for managing a list of songs. This is a **learning and portfolio project**, designed to demonstrate full CRUD operations, filtering, and styling in a modern UI layout using **React**, **Material UI**, and **localStorage** as a simulated database.

---

## ✨ Features

- ✅ Add a new song with title, artist, and "listened" status
- 📝 Edit existing songs inline
- ❌ Delete songs with confirmation dialog
- 🔊 Toggle "listened" / "not listened" status with a single click
- 🔍 Filter songs by:
  - **All / Listened / Not listened**
  - **Search by title or artist**
- 📄 Paginated view (5 songs per page)
- 🎯 Responsive layout for both desktop and mobile
- 📦 LocalStorage used as a simple data persistence layer
- 🎨 Clean UI with **Material Icons** and tooltips
- 🧩 Component-based structure following React best practices
- 📊 Display of total songs, listened, and not listened with interactive filter buttons

---

🛠️ Tech Stack:
- React (functional components & hooks)
- TypeScript
- Material UI
- React Router DOM
- LocalStorage (for mock database)
- Custom CSS modules

## 🚀 Getting Started

Clone the repository and run the development server:

```bash
git clone https://github.com/taka87/song-playlist
cd song-playlist # or the folder name you chose when cloning
    Note: If you renamed the folder while cloning, replace the path accordingly.

npm install
npm start

Then open your browser at:
http://localhost:3000
    Note: The local development server address may vary. Please check your terminal 
    output to confirm the correct localhost URL.
```

## 📬 Feedback
Feel free to open contact me if need any software ideas on Contact form:
https://gotvarska-kniga.vercel.app/contact-info


📁 Project Purpose
- This application was built primarily as a learning tool and portfolio showcase. It includes real-world concepts like:
- Component communication and state lifting
- UI/UX design in React
- File modularization
- Clean folder and file organization
- Use of hooks such as useState, useEffect
- Navigating between views using react-router-dom

📱 Mobile Ready
The layout is responsive and optimized for mobile devices, ensuring usability across different screen sizes. Styles are scoped and structured to keep UI clean and consistent.

💡 Posible Ideas (Optional Enhancements)
- Global search + sorting logic
- External API integration (e.g., Spotify or Last.fm)
- Dark mode toggle
- Export/import songs as JSON
- Authentication and user-specific data

