# CollabSphere

**CollabSphere** is a collaborative platform designed to connect developers and enthusiasts, allowing them to create, share, and join projects seamlessly.

## 🌐 Live Demo

Access the live application here: [collab-sphere-seven.vercel.app](https://collab-sphere-seven.vercel.app)
Video Demo - https://www.loom.com/share/4161bbf09e7d41c0ad22f564bbff1e4e?sid=d9a284e4-21cd-45a3-991b-92d6de7583fe

## 🚀 Features

- **User Authentication**: Secure signup and login functionalities.
- **Project Feed**: Browse through a list of available projects.
- **Express Interest**: Users can express interest in projects.
- **Project Creation**: Authenticated users can create new projects.
- **Responsive Design**: Optimized for various devices.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**:
  - Frontend: Vercel
  - Backend: Render

## 📁 Project Structure
CollabSphere/ ├── client/ # Frontend application │
                    ├── public/ # Static assets │ 
                    └── src/ │ 
                      ├── components/ # Reusable components (e.g., Navbar) │ 
                      ├── context/ # Context API for state management │ 
                      ├── pages/ # Page components (e.g., Login, Signup, Feed) │ 
                      ├── App.js # Main application component │ 
                      └── index.js # Entry point 
              ├── server/ # Backend application │ 
                ├── models/ # Mongoose models │ 
                ├── routes/ # API routes │ 
                ├── controllers/ # Route handlers │ 
                └── server.js # Entry point 
                ├── package.json # Project metadata and scripts 
                

