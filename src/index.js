import express from 'express';
import departmentRoutes from './modules/departments/departmentRoutes.js';

import authRoutes from './modules/auth/authRoutes.js';
import userRoutes from './modules/users/userRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Authentication routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes); 
// Welcome route
app.get('/api/', (req, res) => {
  res.json({ message: 'Welcome' });
});

// Department routes
app.use('/api', departmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
