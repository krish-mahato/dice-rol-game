import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  username: String,
  wins: { type: Number, default: 0 },
  highestScore: { type: Number, default: 0 },
  lastWinAt: { type: Date, default: null }
}, { timestamps: true });

export default mongoose.model('Leaderboard', leaderboardSchema);