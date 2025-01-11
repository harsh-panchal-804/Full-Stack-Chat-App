# ChatApp Backend

## Routes

### Auth Routes

- **POST /api/auth/signup**
  - Description: Sign up a new user.
  - Request Body: `{ email, fullName, password }`
  - Response: User object with `_id`, `fullName`, `email`, `profilePic`.

- **POST /api/auth/login**
  - Description: Log in an existing user.
  - Request Body: `{ email, password }`
  - Response: User object with `_id`, `fullName`, `email`, `profilePic`.

- **POST /api/auth/logout**
  - Description: Log out the current user.
  - Response: Success message.

- **PUT /api/auth/update-profile**
  - Description: Update the profile picture of the logged-in user.
  - Request Body: `{ profilePic }`
  - Response: Updated user object.

- **GET /api/auth/check**
  - Description: Check if the user is authenticated.
  - Response: User object.

### Message Routes

- **GET /api/messages/users**
  - Description: Get a list of users for the sidebar, excluding the logged-in user.
  - Response: Array of user objects.

- **GET /api/messages/:id**
  - Description: Get messages between the logged-in user and another user.
  - URL Params: `id` - The ID of the other user.
  - Response: Array of message objects.

- **POST /api/messages/send/:id**
  - Description: Send a message to another user.
  - URL Params: `id` - The ID of the receiver.
  - Request Body: `{ text, image }`
  - Response: The sent message object.

## Middleware

### Protect Route

- **Function: protectRoute**
  - Description: Middleware to protect routes and ensure the user is authenticated.
  - Usage: Apply to routes that require authentication.

