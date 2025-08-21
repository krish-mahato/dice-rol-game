import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true, lowercase: true },
  passwordHash: { type: String, required: true },
  stats: {
    gamesPlayed: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    highestScore: { type: Number, default: 0 },
    lastPlayedAt: { type: Date, default: null }
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);