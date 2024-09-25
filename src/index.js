import express from 'express';
import cors from 'cors'; // Import CORS to handle cross-origin requests
import dotenv from 'dotenv'; // Load environment variables
import path from 'path'; // Import path module
import { fileURLToPath } from 'url'; // Import fileURLToPath to get directory name

// Route imports
import departmentRoutes from './modules/departments/departmentRoutes.js';
import authRoutes from './modules/auth/authRoutes.js';
import userRoutes from './modules/users/userRoutes.js';

dotenv.config(); // Load .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Serve static files from the dist directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));

// Authentication routes
app.use('/api/auth', authRoutes);

// User routes
app.use('/api', userRoutes); 

// Department routes
app.use('/api', departmentRoutes);

// Welcome route
app.get('/api/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// 404 Route (if no route matches, return a 404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
