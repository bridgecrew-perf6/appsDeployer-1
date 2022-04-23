import express from 'express';

const router = express.Router();

// middleware
import { requireSignin } from '../middlewares/index';

// controllers
import { register, login, update, sendMail, verifyStatus } from '../controllers/authController';

router.post('/register', register);
router.post('/login', login);
router.post('/update', requireSignin, update);
router.post('/send-mail', requireSignin, sendMail);
router.post('/verification-status', requireSignin, verifyStatus);

module.exports = router;