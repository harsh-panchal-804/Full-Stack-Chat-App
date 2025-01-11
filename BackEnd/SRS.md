# Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to provide a detailed specification for the backend of the ChatApp. It includes the functional and non-functional requirements, system architecture, and design details.

### 1.2 Scope
This document covers the backend services of the ChatApp, including user authentication, message handling, and database interactions.

## 2. Overall Description

### 2.1 Product Perspective
The backend is a RESTful API built with Node.js and Express.js, connected to a MongoDB database. It handles user authentication, message sending, and real-time communication.

### 2.2 Product Functions
- User registration and authentication
- Profile management
- Sending and receiving messages
- Real-time notifications

## 3. Functional Requirements

### 3.1 User Authentication

#### 3.1.1 Sign Up
- **Description**: Allow users to create a new account.
- **Endpoint**: `POST /api/auth/signup`
- **Request**: `{ email, fullName, password }`
- **Response**: User object

#### 3.1.2 Log In
- **Description**: Allow users to log in to their account.
- **Endpoint**: `POST /api/auth/login`
- **Request**: `{ email, password }`
- **Response**: User object

#### 3.1.3 Log Out
- **Description**: Log out the current user.
- **Endpoint**: `POST /api/auth/logout`
- **Response**: Success message

#### 3.1.4 Update Profile
- **Description**: Update the profile picture of the logged-in user.
- **Endpoint**: `PUT /api/auth/update-profile`
- **Request**: `{ profilePic }`
- **Response**: Updated user object

#### 3.1.5 Check Authentication
- **Description**: Check if the user is authenticated.
- **Endpoint**: `GET /api/auth/check`
- **Response**: User object

### 3.2 Messaging

#### 3.2.1 Get Users for Sidebar
- **Description**: Get a list of users for the sidebar, excluding the logged-in user.
- **Endpoint**: `GET /api/messages/users`
- **Response**: Array of user objects

#### 3.2.2 Get Messages
- **Description**: Get messages between the logged-in user and another user.
- **Endpoint**: `GET /api/messages/:id`
- **URL Params**: `id` - The ID of the other user
- **Response**: Array of message objects

#### 3.2.3 Send Message
- **Description**: Send a message to another user.
- **Endpoint**: `POST /api/messages/send/:id`
- **URL Params**: `id` - The ID of the receiver
- **Request**: `{ text, image }`
- **Response**: The sent message object

## 4. Non-Functional Requirements

### 4.1 Performance
- The system should handle up to 1000 concurrent users.
- Response time for API requests should be less than 500ms.

### 4.2 Security
- All sensitive data should be encrypted.
- JWT tokens should be used for authentication.

### 4.3 Scalability
- The system should be able to scale horizontally to handle increased load.

## 5. System Architecture

### 5.1 Overview
The backend system is built using Node.js and Express.js, with MongoDB as the database. It uses JWT for authentication and Cloudinary for image storage.

### 5.2 Components
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing user and message data.
- **JWT**: JSON Web Tokens for secure authentication.
- **Cloudinary**: Cloud service for image storage.

## 6. Database Design

### 6.1 User Model
- **Fields**: `_id`, `email`, `fullName`, `password`, `profilePic`

### 6.2 Message Model
- **Fields**: `_id`, `senderId`, `receiverId`, `text`, `image`, `timestamp`

## 7. API Documentation

Refer to the [README.md](./README.md) for detailed API documentation.
