import express from 'express';
import cors from 'cors';
import runnersRoutes from './routes/runners.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', runnersRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
