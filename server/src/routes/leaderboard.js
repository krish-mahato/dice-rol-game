import { Router } from 'express';
import { leaderboard } from '../controllers/gameController.js';

const router = Router();
router.get('/', leaderboard);

export default router;