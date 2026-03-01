import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import healthRouter from './routes/health.js';
import authRouter from './routes/auth.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Third-party middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routers
app.use('/health', healthRouter);
app.use('/auth', authRouter);

// Error handler — must be registered after all routers
app.use(errorHandler);

export default app;
