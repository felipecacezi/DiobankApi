import { db } from '../configs/firebase.config';
import { ref, remove } from 'firebase/database';

export class DeleteAccount {
    private acc_number: string;

    constructor(accountId: string) {
        this.acc_number = accountId;
    }

    async deleteAccount(): Promise<{ message: string; data: {} }> {
        try {
            const accountRef = ref(db, `accounts/${this.acc_number}`);
            await remove(accountRef);

            return {
                message: `Account ${this.acc_number} has been deleted successfully.`,
                data: {},
            };
        } catch (error: any) {
            throw new Error(`Error deleting account ${this.acc_number}: ${error.message}`);
        }
    }
}