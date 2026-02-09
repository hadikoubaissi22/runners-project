// api/register.js
import { z } from 'zod';
import { pool } from '../db.js';

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Parse and validate request
    const runnerSchema = z.object({
      full_name: z.string().min(3),
      phone: z.string().min(6),
      address: z.string().min(3),
      experience_level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
      preferred_distance: z.enum(['5K', '10K', 'Half']),
      pace: z.string(),
      days: z.array(z.object({
        day: z.string(),
        time: z.string()
      })).min(1),
      comments: z.string().optional()
    });

    const data = runnerSchema.parse(req.body);

    // Save to database
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

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}
