import { injectable } from "inversify";
import { ChestState, IDBUserChest, Loot, UserChest } from "./entity";
import { database } from "../../database/database";
import { User } from "../users/entity";


const CHESTS = 'chests';
const CHESTS_LOOT = 'chests_loot';
const USER_CHESTS = 'user_chests';


@injectable()
export class ChestsService {
  async getUserChestsByUserId(userId: number): Promise<UserChest[]> {
    const { rows } = await database.raw(`
    select
      user_chests.*,
      chests.resource,
      chests."openImmediatlyPrice",
      chests."timeToOpen"
    from user_chests left join chests on "chestId" = "parentChestId"  where "userId" = ? and state <> 'opened';`,
      [userId]);
    return rows;
  }

  async getUserChestsById(userChestId: number): Promise<UserChest> {
    const { rows: [chest] } = await database.raw(`
    select
      user_chests.*,
      chests.resource,
      chests."openImmediatlyPrice",
      chests."timeToOpen"
    from user_chests left join chests on "chestId" = "parentChestId"  where "userChestId" = ? and state <> 'opened';`,
      [userChestId]);
    return chest;
  }

  async getUserChest(userId: number, userChestId: number) {
    const userChests = await this.getUserChestsByUserId(userId);
    return userChests.find(c => c.userChestId === userChestId)
  }

  async getLootForChest(chestId: number): Promise<Loot[]> {
    return database(CHESTS_LOOT).where({ chestId });
  }

  async updateUserChestState(userChestId: number, data: Partial<IDBUserChest>): Promise<UserChest> {
    await database(USER_CHESTS).where({ userChestId }).update(data);
    return this.getUserChestsById(userChestId);
  }

  async getIDBUserChest(userChestId: number): Promise<IDBUserChest> {
    return database(USER_CHESTS).where({ userChestId }).first();
  }

  async createUserChest(chest: IDBUserChest): Promise<IDBUserChest> {
    const [userChestId] = await database(USER_CHESTS).insert(chest).returning('userChestId');
    return database(USER_CHESTS).where({ userChestId }).first();
  }
}