// routes/runners.js
import express from 'express';
const router = express.Router();

// This matches POST /api/register because of the app.use('/api', ...) mount
router.post('/register', (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "Success!" });
});

export default router;