import express from 'express';
import Log from '../models/logModel.js';

const router = express.Router();

// Fetch logs from MongoDB
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch logs' });
  }
});

export default router;
