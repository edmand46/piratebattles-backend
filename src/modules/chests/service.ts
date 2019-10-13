import { injectable } from "inversify";
import { UserChest } from "./entity";
import { database } from "../../database/database";


const CHESTS = 'chests';
const CHESTS_LOOT = 'chests_loot';
const USER_CHESTS = 'user_chests';


@injectable()
export class ChestsService {
  getUserChests(userId: number): Promise<UserChest[]> {
    return database(USER_CHESTS).where({ userId });
  }
}