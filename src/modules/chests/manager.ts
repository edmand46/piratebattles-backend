import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { ChestsService } from "./service";
import { Chest, UserChest } from "./entity";
import { WrappedUserChest } from "./dto";
import { User } from "../users/entity";

@injectable()
export class ChestsManager {
  @inject(TYPES.ChestsService) private chestsService: ChestsService;

  async getUserChests(userId: number): Promise<UserChest[]> {
    // return this.chestsService
    return [];
  }

  addChestForUser(user: User, chestId: number) {

  }
}