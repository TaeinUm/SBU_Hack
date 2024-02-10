import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT || 3001;

import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import connectDB from "./config/db.js";

connectDB();
const app = express();
app.use(express.json()); //app.use(body-parser.json())이랑 같음
app.use(urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ROUTES that are going to be created
// 1. Register a User : POST api/users/register
// 2. Authenticate a user and get a token POST api/users/auth
// 3. Logout user and clear cookie POST api/users/logout
// 4. Get user profile GET api/users/profile[id] - protected route
// 5. Update Profile PUT api/users/profile[id]
// 5. Delete User DELETE api/users/profile[id]
