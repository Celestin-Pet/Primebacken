import express from 'express';
import departmentRoutes from './modules/departments/departmentRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Welcome route
app.get('/api/', (req, res) => {
  res.json({ message: 'Welcome' });
});

// Department routes
app.use('/api', departmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
