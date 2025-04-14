import { Router, Request, Response } from 'express';
import { AccountController } from '../controllers/Account.controller';

const router = Router();

router.post('/account/create', AccountController.createAccount);
router.get('/account/:id', AccountController.getAccount);
router.patch('/account/:id', AccountController.updateAccount);
router.delete('/account/:id', AccountController.deleteAccount);

export default router;