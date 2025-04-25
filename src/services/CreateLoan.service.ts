import { LoanDTO } from "../dtos/loan.dto";
import { db } from '../configs/firebase.config';
import { ref, set } from 'firebase/database';
import { GetAccount } from "./GetAccount.services";
import { UpdateAccount } from '../services/UpdateAccount.services';

export class CreateLoan {
    private acc_number: string;
    private loan_value: number;
    private loan_date: number;
    private loan_paid_date: string;

    constructor(loanData: LoanDTO) {
        const { acc_number, loan_value, loan_paid_date } = loanData;
        this.acc_number = acc_number ?? '';
        this.loan_value = parseFloat(loan_value) ?? 0.00;
        this.loan_date = Date.now();
        this.loan_paid_date = loan_paid_date ?? '';
    }

    async getArray(): Promise<any> {
        return {
            acc_number: this.acc_number,
            loan_value: this.loan_value,
            loan_date: this.loan_date,
            loan_paid_date: this.loan_paid_date,
        };
    }

    async createLoan(): Promise<{ message: string, data: any }> {
        try {

            const account = new GetAccount(parseInt(this.acc_number));
            const accountData = await account.getAccount();
            if (!accountData) {
                throw new Error(`The ${this.acc_number} account not found.`);
            }            

            const reference = ref(db, `loans/${this.acc_number}`);
            const data = await this.getArray();
            await set(reference, data);

            const newBalance = parseFloat(accountData.data.acc_balance) + this.loan_value;

            const update = new UpdateAccount(
                parseInt(this.acc_number), 
                { acc_balance: newBalance }
            );        
            await update.updateAccount();

            return {
                message: `Loan of ${this.loan_value} to ${this.acc_number} account created successfully.`,
                data: data,
            }
        } catch (error) {
            throw new Error(`Error creating loan ${this.acc_number}`);
        }
    }
}