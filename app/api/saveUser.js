import dbConnect from '@/config/db';
import User from '@/models/userModel';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    try {
      const user = await User.create({ userId });
      res.status(200).json(user);
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ error: 'User already exists' });
      } else {
        res.status(500).json({ error: 'Failed to save user' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
