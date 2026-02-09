import express from 'express';
import { z } from 'zod';
import { pool } from './db.js';


const router = express.Router();


const runnerSchema = z.object({
    full_name: z.string().min(3),
    phone: z.string().min(6),
    address: z.string().min(3),
    experience_level: z.enum([
        'Beginner',
        'Intermediate',
        'Advanced'
    ]),

    preferred_distance: z.enum([
        '5K',
        '10K',
        'Half'
    ]),
    pace: z.string(),
    days: z.array(z.object({
        day: z.string(),
        time: z.string()
    })).min(1),
    comments: z.string().optional()
});


router.post('/register', async (req, res) => {
try {
const data = runnerSchema.parse(req.body);


await pool.query(
  `INSERT INTO runner_requests
  (full_name, phone, address, experience_level, preferred_distance, pace, days, comments)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
  [
    data.full_name,
    data.phone,
    data.address,
    data.experience_level,
    data.preferred_distance,
    data.pace,
    JSON.stringify(data.days),
    data.comments || null
  ]
);



res.json({ success: true });
} catch (e) {
    res.status(400).json({ error: e.message });
}
});


export default router;