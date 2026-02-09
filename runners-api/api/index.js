import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import runnersRoutes from '../routes/runners.js';

dotenv.config();

const app = express();

/* ✅ MUST COME BEFORE ROUTES */
app.use(cors({
  origin: '*', // ← TEMP: allow all (safe for now)
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

/* ✅ HANDLE PREFLIGHT */
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://runners-project.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});

app.use(express.json());

app.use('/api', runnersRoutes);

export default app;
