# MERN Stack Chat App

Welcome to Chatty! This application allows users to chat in real-time, share messages, and upload photos seamlessly.

## Features

- **Real-time messaging** powered by [Socket.IO](https://socket.io/).
- **Photo sharing**: Upload photos to [Cloudinary](https://cloudinary.com/) and share them instantly.
- **State management** using [Zustand](https://github.com/pmndrs/zustand).
- **Frontend** built with [React](https://reactjs.org/) and styled using [DaisyUI](https://daisyui.com/) with 15+ customizable themes.
- **Backend** developed using [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/).
- **Database**: All data is stored in [MongoDB](https://www.mongodb.com/).
- **Responsive Design**: Fully optimized for desktop and mobile devices.

## Deployment

The project has been deployed on [Render](https://render.com/). You can access it at:
(https://full-stack-chat-app-4.onrender.com/)

## Demo

![Demo GIF](resources/chatty-video.gif)



## Tech Stack

### Frontend
- React
- DaisyUI (TailwindCSS-based component library)
- Zustand (State management)

### Backend
- Node.js
- Express.js
- Socket.IO

### Database
- MongoDB

### Third-Party APIs
- Cloudinary (for image storage)

## Installation

Follow these steps to set up the project locally:

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local or cloud)
- Cloudinary account

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/harsh-panchal-804/Full-Stack-Chat-App
   ```

2. **Install Dependencies**
   ```bash
   # Install server dependencies
   cd FrontEnd
   npm install

   # Install client dependencies
   cd BackEnd
   npm install
   ```

3. **Set Up Environment Variables**
   Create `.env` files in both the `server` and `client` directories.

   **Server `.env`:**
   ```env
   MONGO_URI=your-mongodb-connection-string
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   PORT=5000
   ```

4. **Run the Application**
   ```bash
   # Start the server
   cd BackEnd
   npm run dev

   # Start the client
   cd FronEnd
   npm run dev
   ```

## Contributions

Feel free to submit a pull request or open an issue for any suggestions or improvements.



