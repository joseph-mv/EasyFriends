# DailyDo

EasyFriends is a social networking web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It enables users to connect with others, send friend requests, accept or decline them, and manage their friends list seamlessly.

## Features

- **User Authentication**:
- User registration and login with JWT-based authentication.

- Secure password storage using bcrypt.
- **Friend Management**: 
- Separate tabs for each day to organize your tasks.
- Accept or Decline Requests: Manage incoming friend requests.

- Unfriend: Remove a user from your friends list.

- Mutual Friends: View mutual friends between two users.
 
- **Responsive Design**: Works on all device sizes.


## Technologies Used

- **Frontend**: React.js, TypeScript, Vite, HTML, Tailwind CSS
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **State Management**:redux Toolkit
- **Backend**: node ,express


## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/joseph-mv/EasyFriends.git
   cd EasyFriends
    ```
 
2. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
    ```
3. **Set up environment variables:** Create a .env file in backend folder and add the following variable:
  ```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/EasyFriends
NODE_ENV=development
JWT_SECRET=your_jwt_token_secret
```

4. **Install frontend dependencies:**

   ```bash
   cd frontend
   npm install
    ```

 5. **Set up environment variables:** Create a .env file in frontend folder and add the following variable:
  ```bash
VITE_BASE_URL=http://localhost:3000
```
### Running the application

1.**Start the backend  server :**
- Open a terminal and navigate to the backend directory, then run:


 ```bash
 cd backend
   npm run dev

```

2.**Start the frontend server :**
- Open a new terminal, navigate to the client directory, and run

 ```bash
 cd frontend
   npm run dev

```

### Running Tests



   ### Contributing:

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository.**
2. **Create a new branch:** `git checkout -b feature/your-feature`
3. **Make your changes.**
4. **Commit your changes:** `git commit -m 'Add new feature'`
5. **Push to your branch:** `git push origin feature/your-feature`
6. **Create a pull request.**

**License:**

[MIT License]

**Acknowledgements:**

* Thanks to the React, TypeScript, Vite, IndexedDB, Tailwind CSS,Vitest communities for their excellent tools and resources..
