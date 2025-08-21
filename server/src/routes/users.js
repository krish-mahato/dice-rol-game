import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { me, findByUsername } from '../controllers/userController.js';

const router = Router();
router.get('/me', auth, me);
router.get('/by-username/:username', findByUsername);

export default router;