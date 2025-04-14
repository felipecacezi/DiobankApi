import { AccountDTO } from '../dtos/account.dto';
import { db } from '../configs/firebase.config';
import { ref, get } from 'firebase/database';

export class GetAccount {
    private acc_number: number;

    constructor(accountId: number) {
        this.acc_number = accountId;
    }
        
    async getAccount(): Promise<{data: AccountDTO|{}}> {
        try {
            const reference = ref(db, `accounts/${this.acc_number}`);
            const snapshot = await get(reference);
            const account = snapshot.val() ?? {};

            return {
                data: account,
            }
        } catch (error) {
            throw new Error(`Error to get account: ${this.acc_number}.`);
        }
    }
}