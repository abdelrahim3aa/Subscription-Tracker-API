import express from 'express'; 
import dotenv from 'dotenv'; 
import cors from 'cors'; 
import helmet from 'helmet';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js'; 
import subscriptionRoutes from './routes/subscriptionRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; 
import './cron/jobs.js';
// import testMail from './routes/mailRoutes.js'; 


// Load environment variables
dotenv.config(); 

// Initialize the Express app
const app = express(); 

// Apply global middlewares
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Allow cross-orignin requests 
app.use(helmet()); // Add security headers

// Import and connect to the database
connectDB(); 

// Mount API routes
app.get('/', (req, res) => res.json({ message: 'SubTrack API is running 🚀' })); 
app.use('/api/v1/auth', authRoutes); 
app.use('/api/v1/subscriptions', subscriptionRoutes); 
app.use('/api/v1/users', userRoutes); 
// app.use('/api/v1', testMail); 
// Start the server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}); 