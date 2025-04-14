import { AccountDTO } from '../dtos/account.dto';
import { db } from '../configs/firebase.config';
import { ref, set } from 'firebase/database';

export class CreateAccount{
    private acc_number: string;
    private acc_owner_name: string;
    private acc_balance: number;
    private acc_status: string;

    constructor(accountData: AccountDTO) {        
        const {acc_number, acc_owner_name, acc_status} = accountData;
        this.acc_number = acc_number ?? '';
        this.acc_owner_name = acc_owner_name ?? '';
        this.acc_balance = 0.00;
        this.acc_status = acc_status ?? '';
    }

    async getArray(): Promise<AccountDTO> {
        return {
            acc_number: this.acc_number,
            acc_owner_name: this.acc_owner_name,
            acc_balance: this.acc_balance,
            acc_status: this.acc_status,
        };
    }
    
    async createAccount(): Promise<{message: string, data: AccountDTO}> {
        try {
            const reference = ref(db, `accounts/${this.acc_number}`);
            const data = await this.getArray();
            await set(reference, data);
            return {
                message: `Account ${this.acc_number} created successfully.`,
                data: data,
            }
        } catch (error) {
            throw new Error(`Error creating account ${this.acc_number}`);
        }
    }
}