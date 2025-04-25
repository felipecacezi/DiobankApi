import { Router, Request, Response } from 'express';
import { AccountController } from '../controllers/Account.controller';
import { LoanController } from '../controllers/Loan.controller';

const router = Router();

router.post('/account/create', AccountController.createAccount);
router.get('/account/:id', AccountController.getAccount);
router.patch('/account/:id', AccountController.updateAccount);
router.delete('/account/:id', AccountController.deleteAccount);

router.patch('/account/:id/deposit', AccountController.createDeposit);
router.patch('/account/:id/withdraw', AccountController.createWithdraw);

router.post('/loan', LoanController.createLoan);

export default router;