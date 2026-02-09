// api/register.js
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body);
    res.status(200).json({ message: "Success!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
