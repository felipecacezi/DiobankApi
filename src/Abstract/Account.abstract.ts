import { Request, Response } from 'express';

export abstract class Account {
    static async getAccount(req: Request, res: Response): Promise<any> {}

    static async createAccount(req: Request, res: Response): Promise<any> {}

    static async updateAccount(req: Request, res: Response): Promise<any> {}

    static async deleteAccount(req: Request, res: Response): Promise<any> {}

    static async createDeposit(req: Request, res: Response): Promise<any> {}

    static async createWithdraw(req: Request, res: Response): Promise<any> {}
}