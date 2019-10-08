import { injectable, inject } from "inversify";
import { User } from "./entity";
import { database } from "../../database/database";

const USERS = 'users';

@injectable()
export class UsersService {
  async createUser(userData: User): Promise<User> {
    const [userId] = await database(USERS).insert(userData).returning('userId');
    return this.getUserById(userId);
  }

  async getUserById(userId: number): Promise<User> {
    return database(USERS).where({ userId }).first();
  }

  async updateUserById(userId, userData: Partial<User>): Promise<User> {
    await database(USERS).where({ userId }).update(userData);
    return this.getUserById(userId)
  }
}