import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import runnersRoutes from './routes/runners.js';

dotenv.config();

const app = express();

/* ✅ CORS CONFIG */
app.use(cors({
  origin: [
    'https://runners-project.vercel.app',
    'https://runners-form.vercel.app'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

/* ✅ IMPORTANT: allow preflight */
app.options('*', cors());

app.use('/api', runnersRoutes);

export default app;
