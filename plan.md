1️⃣ What are we building?

We’re building a Note-Taking App (REST API) using the MVC pattern and MongoDB.
It will allow users to:

~ Sign up and log in.

~ Create, read, update, and delete notes.

~ Each note belongs to a user.

2️⃣ What technologies will we use?

Purpose	                    Technology

    Server	                   Node.js + Express.js
    Database	               MongoDB + Mongoose
    Architecture	           MVC (Model - View - Controller)
    Security	               bcrypt (for password hashing), JWT (for authentication)
    Environment Variables	   dotenv
    Development	               nodemon (for auto-restart)


3️⃣ Folder structure plan

Here’s how we’ll structure the app:

note-app/
│
├── server.js                 # Entry point of the app
├── .env                      # Environment variables
├── package.json              # Project info and dependencies
│
├── config/
│   └── db.js                 # MongoDB connection setup
│
├── models/
│   ├── userModel.js          # User schema (name, email, password)
│   └── noteModel.js          # Note schema (title, content, userId)
│
├── controllers/
│   ├── userController.js     # Handle user signup/login logic
│   └── noteController.js     # Handle note CRUD logic
│
├── routes/
│   ├── userRoutes.js         # /api/users routes
│   └── noteRoutes.js         # /api/notes routes
│
└── middleware/
    └── authMiddleware.js     # Protect routes (verify JWT)

4️⃣ Project flow

When you start the project:

server.js runs → connects to database (db.js) → loads routes.

When you hit /api/users/register → Express goes to userRoutes.js.

The route calls the registerUser controller in userController.js.

The controller creates a new User using the userModel.js.

The same pattern applies for Notes.

🧱 Express.js for routing

🔐 JWT authentication middleware

🧍‍♂️ User system (register, login, CRUD)

💳 Subscription management (CRUD)

💾 MongoDB + Mongoose integration

🧰 Validation with express-validator