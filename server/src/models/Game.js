import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  players: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    finalScore: Number
  }],
  winner: {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    score: Number
  },
  targetScore: { type: Number, default: 20 },
  rounds: [{
    turn: Number,
    playerUsername: String,
    roll: Number,
    cumulativeScore: Number,
    at: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.model('Game', gameSchema);