// api/register.js

export default async function handler(req, res) {
  // Allow requests only from your frontend (or '*' for all)
  res.setHeader('Access-Control-Allow-Origin', 'https://runners-project.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const data = req.body;

      // Example: log the data (you can later save it to DB)
      console.log('Received registration data:', data);

      // Validate fields (optional)
      if (!data.name || !data.email || !data.days) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // You can add DB insertion logic here
      // await db.insertRegistration(data);

      return res.status(200).json({ message: 'Registration successful!' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
