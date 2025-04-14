import { AccountDTO } from '../dtos/account.dto';
import { db } from '../configs/firebase.config';
import { ref, update } from 'firebase/database';

export class UpdateAccount {
    private acc_number: number;
    private acc_data: AccountDTO;

    constructor(accountId: number, accountData: AccountDTO) {
        this.acc_number = accountId;
        this.acc_data = accountData;
    }
        
    async updateAccount(): Promise<{data: AccountDTO|{}}> {
        try {
            const accountRef = ref(db, `accounts/${this.acc_number}`);
            const account = await update(accountRef, this.acc_data);
            
            return {
                data: this.acc_data,
            }
        } catch (error) {
            throw new Error(`Error to get account: ${this.acc_number}.`);
        }
    }
}