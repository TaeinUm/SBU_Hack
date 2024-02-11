// Importing required modules
import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';


// Importing configurations and middleware
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Importing routes
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Database connection
connectDB();

// Express app initialization
const app = express();

// Derive the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// // Serve static files from the React app/
// app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to NaengJangGo!');
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Server configuration
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Notes for future routes to be created
// 1. Register a User: POST api/users/register
// 2. Authenticate a user and get a token: POST api/users/auth
// 3. Logout user and clear cookie: POST api/users/logout
// 4. Get user profile: GET api/users/profile[id] - protected route
// 5. Update Profile: PUT api/users/profile[id]
// 6. Delete User: DELETE api/users/profile[id]
