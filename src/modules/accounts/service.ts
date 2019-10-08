import { injectable } from "inversify";
import { Account, TypeAccount } from "./entity";
import { database } from "../../database/database";

const ACCOUNTS = 'accounts';

@injectable()
export class AccountsService {
  async linkAccountByDeviceId(userId: number, deviceId: string): Promise<Account> {
    const acc: Account = { type: TypeAccount.DEVICE_ID, data: { deviceId }, userId };
    const [accountId] = await database(ACCOUNTS).insert(acc).returning('accountId');
    return this.getAccountById(accountId);
  }

  async getAccountByDeviceId(deviceId: string): Promise<Account[]> {
    return database(ACCOUNTS).whereRaw(`data->>'deviceId' = ?`, [deviceId]);
  }

  async getAccountsForUser(userId: number): Promise<Account[]> {
    return database(ACCOUNTS).where({ userId });
  }

  async getAccountById(accountId: number): Promise<Account> {
    return database(ACCOUNTS).where({ accountId }).first();
  }
}