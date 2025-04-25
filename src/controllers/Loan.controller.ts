import { Request, Response } from 'express';
import { LoanDTO } from '../dtos/loan.dto';
import { CreateLoan } from '../services/CreateLoan.service';

export class LoanController {
    static async createLoan(req: Request, res: Response) {
        try {
            const arLoan : LoanDTO = req.body;
            const account = new CreateLoan(arLoan);        
            const loan = await account.createLoan();
            console.log(loan);
            
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            const message = error.message ?? 'Internal Server Error';
            res.status(statusCode).json({
                message: message,
                data:[],
            });
        }
    }
}