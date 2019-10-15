import { injectable } from "inversify";
import { IDBUserChest, Loot, UserChest } from "./entity";
import { database } from "../../database/database";
import { User } from "../users/entity";


const CHESTS = 'chests';
const CHESTS_LOOT = 'chests_loot';
const USER_CHESTS = 'user_chests';


@injectable()
export class ChestsService {
  async getUserChests(userId: number): Promise<UserChest[]> {
    const { rows } = await database.raw(`
    select
      user_chests.*,
      chests.resource,
      chests."openImmediatlyPrice",
      chests."timeToOpen"
    from user_chests left join chests on "chestId" = "parentChestId"  where "userId" = ?;`,
      [userId]);
    return rows;
  }

  async getLootForChest(chestId: number): Promise<Loot[]> {
    return database(CHESTS_LOOT).where({ chestId });
  }

  async getUserChest(userChestId: number): Promise<IDBUserChest> {
    return database(USER_CHESTS).where({ userChestId }).first();
  }

  async createUserChest(chest: IDBUserChest): Promise<IDBUserChest> {
    const [userChestId] = await database(USER_CHESTS).insert(chest).returning('userChestId');
    return database(USER_CHESTS).where({ userChestId }).first();
  }
}