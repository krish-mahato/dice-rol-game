import User from '../models/User.js';
import Game from '../models/Game.js';
import Leaderboard from '../models/Leaderboard.js';

export const recordGame = async (req, res) => {
  try {
    const { players, rounds, winner, targetScore } = req.body; // players: [{id, username, finalScore}]
    if (!players || !winner) return res.status(400).json({ error: 'Invalid payload' });

    const game = await Game.create({
      players: players.map(p => ({ user: p.id, username: p.username, finalScore: p.finalScore })),
      rounds,
      winner: { user: winner.id, username: winner.username, score: winner.score },
      targetScore: targetScore || 20
    });

    // Update stats for users
    const playerIds = players.map(p => p.id);
    const dbPlayers = await User.find({ _id: { $in: playerIds } });
    for (const p of dbPlayers) {
      p.stats.gamesPlayed += 1;
      const isWinner = String(p._id) === String(winner.id);
      if (isWinner) {
        p.stats.wins += 1;
        if (!p.stats.highestScore || winner.score > p.stats.highestScore) {
          p.stats.highestScore = winner.score;
        }
      }
      p.stats.lastPlayedAt = new Date();
      await p.save();
    }

    // Update leaderboard
    let lb = await Leaderboard.findOne({ user: winner.id });
    if (!lb) {
      lb = await Leaderboard.create({ user: winner.id, username: winner.username, wins: 1, highestScore: winner.score, lastWinAt: new Date() });
    } else {
      lb.wins += 1;
      if (winner.score > lb.highestScore) lb.highestScore = winner.score;
      lb.username = winner.username;
      lb.lastWinAt = new Date();
      await lb.save();
    }

    res.status(201).json({ ok: true, gameId: game._id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const historyForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const games = await Game.find({ "players.user": userId }).sort({ createdAt: -1 }).limit(50);
    res.json(games);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const leaderboard = async (_req, res) => {
  try {
    const top = await Leaderboard.find().sort({ wins: -1, highestScore: -1, updatedAt: -1 }).limit(50);
    res.json(top);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};