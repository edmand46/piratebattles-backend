import { inject, injectable } from "inversify";
import { isNil } from 'lodash';
import { TYPES } from "../../inverisify/types";
import { ChestsService } from "./service";
import { ChestState, IDBUserChest, Loot, UserChest } from "./entity";
import { createErrorObject } from "../../utils";
import { USER_CHEST_NOT_FOUND } from "../../constants";

@injectable()
export class ChestsManager {
  @inject(TYPES.ChestsService) private chestsService: ChestsService;

  async getUserChests(userId: number): Promise<UserChest[]> {
    return this.chestsService.getUserChests(userId);
  }

  async openChest(userChestId): Promise<Loot> {
    const userChest = await this.chestsService.getUserChest(userChestId);
    if (isNil(userChest)) throw createErrorObject(USER_CHEST_NOT_FOUND);
    const { parentChestId } = userChest;
    const loot: Loot[] = await this.chestsService.getLootForChest(parentChestId);
    return loot[Math.floor(Math.random() % loot.length - 1)];
  }

  async giveChestUser(userId: number, chestId: number): Promise<void> {
    const userChest: IDBUserChest = {
      parentChestId: chestId,
      state: ChestState.CLOSED,
      userId,
    };
    await this.chestsService.createUserChest(userChest);
  }
}