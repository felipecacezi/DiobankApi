import { Request, Response } from 'express';
import { Account } from '../Abstract/Account.abstract';
import { AccountDTO } from '../dtos/account.dto';
import { CreateAccount } from '../services/CreateAccount.services';
import { GetAccount } from '../services/GetAccount.services';
import { UpdateAccount } from '../services/UpdateAccount.services';
import { DeleteAccount } from '../services/DeleteAccount.services';

export class AccountController extends Account {
    static async getAccount(req: Request, res: Response): Promise<any> {
        try {
            const accountId = req.params.id;
            const account = new GetAccount(parseInt(accountId));
            const accountData = await account.getAccount();
            res.status(200).json({
                message: accountData.message,
                data: accountData.data,
            });            
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            const message = error.message ?? 'Internal Server Error';
            res.status(statusCode).json({
                message: message,
                data:[],
            });
        }
    }

    static async createAccount(req: Request, res: Response): Promise<any> {
        try {
            const accData: AccountDTO = req.body;   
            const account = new CreateAccount(accData);        
            const createdAccount = await account.createAccount();
            res.status(201).json({
                message: createdAccount.message,
                data: createdAccount.data,
            });
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            const message = error.message ?? 'Internal Server Error';
            res.status(statusCode).json({
                message: message,
                data:[],
            });
        }
    }

    static async updateAccount(req: Request, res: Response): Promise<any> {
        try {
            const accountId = req.params.id;
            const accData: AccountDTO = req.body;   

            const account = new GetAccount(parseInt(accountId));
            const accountData = await account.getAccount();

            if (!accountData.data) {
                throw new Error(`Error to update account ${accountId}, account not found.`);                
            }
            
            const update = new UpdateAccount(parseInt(accountId), accData);        
            const updatedAccount = await update.updateAccount();
            
            res.status(200).json({
                message: `Account ${accountId} has been updated successfully.`,
                data: updatedAccount.data,
            });
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            const message = error.message ?? 'Internal Server Error';
            res.status(statusCode).json({
                message: message,
                data:[],
            });
        }
    }

    static async deleteAccount(req: Request, res: Response): Promise<any> {
        try {
            const accountId = req.params.id;
            const deleteService = new DeleteAccount(accountId);
            const deletionResult = await deleteService.deleteAccount();

            res.status(200).json({
                message: deletionResult.message,
                data: deletionResult.data,
            });
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            const message = error.message ?? 'Internal Server Error';
            res.status(statusCode).json({
                message: message,
                data: [],
            });
        }
    }

    static async createDeposit(req: Request, res: Response): Promise<any> {
        try {
            const accountId = req.params.id;
            const depositAmount = req.body.amount;

            const account = new GetAccount(parseInt(accountId));
            const accountData = await account.getAccount();

            if (!accountData.data) {
                throw new Error(`Error to deposit to account ${accountId}, account not found.`);                
            }

            const update = new UpdateAccount(parseInt(accountId), { acc_balance: depositAmount + accountData.data.acc_balance });        
            await update.updateAccount();

            res.status(200).json({
                message: `Deposit of ${depositAmount} to account ${accountId} has been processed successfully.`,
                data: {},
            });
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            const message = error.message ?? 'Internal Server Error';
            res.status(statusCode).json({
                message: message,
                data: [],
            });
        }
    }

    static async createWithdraw(req: Request, res: Response): Promise<any> {
        try {
            const accountId = req.params.id;
            const depositAmount = req.body.amount;

            const account = new GetAccount(parseInt(accountId));
            const accountData = await account.getAccount();

            if (!accountData.data) {
                throw new Error(`Error to withdraw to account ${accountId}, account not found.`);                
            }

            if (accountData.data.acc_balance < depositAmount) {
                throw new Error(`Error to withdraw to account ${accountId}, insufficient funds.`);                
            }

            if (accountData.data.acc_balance < 0) {
                throw new Error(`Error to withdraw to account ${accountId}, insufficient funds.`);        
            }

            if (accountData.data.acc_balance === 0) {
                throw new Error(`Error to withdraw to account ${accountId}, insufficient funds.`);        
            }

            const newBalance = accountData.data.acc_balance - depositAmount;

            const update = new UpdateAccount(parseInt(accountId), { acc_balance: newBalance });        
            await update.updateAccount();

            res.status(200).json({
                message: `Withdraw of ${depositAmount} to account ${accountId} has been processed successfully.`,
                data: {},
            });
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            const message = error.message ?? 'Internal Server Error';
            res.status(statusCode).json({
                message: message,
                data: [],
            });
        }
    }
}