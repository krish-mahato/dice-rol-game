import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { recordGame, historyForUser } from '../controllers/gameController.js';

const router = Router();
router.post('/record', auth, recordGame);
router.get('/history/:userId', auth, historyForUser);

export default router;