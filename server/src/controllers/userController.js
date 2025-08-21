import User from '../models/User.js';

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ id: user._id, username: user.username, email: user.email, stats: user.stats });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const findByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ id: user._id, username: user.username, email: user.email, stats: user.stats });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};