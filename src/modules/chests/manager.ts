import { inject, injectable } from "inversify";
import { isNil } from 'lodash';
import { TYPES } from "../../inverisify/types";
import { ChestsService } from "./service";
import { ChestState, IDBUserChest, Loot, UserChest } from "./entity";
import { createErrorObject } from "../../utils";
import { USER_CHEST_NOT_FOUND, USER_CHEST_STATE_INVALID } from "../../constants";

@injectable()
export class ChestsManager {
  @inject(TYPES.ChestsService) private chestsService: ChestsService;

  async getUserChests(userId: number): Promise<UserChest[]> {
    return this.chestsService.getUserChestsByUserId(userId);
  }

  async checkUserHasChest(userChestId: number) : Promise<IDBUserChest> {
    const idbUserChest = await this.chestsService.getIDBUserChest(userChestId);
    if (isNil(idbUserChest)) throw createErrorObject(USER_CHEST_NOT_FOUND);
    return idbUserChest;
  }

  async startChestOpening(userChestId: number): Promise<UserChest> {
    const { state } = await this.checkUserHasChest(userChestId);
    if (state !== ChestState.CLOSED) throw createErrorObject(USER_CHEST_STATE_INVALID);
    return this.chestsService.updateUserChestState(userChestId, ChestState.OPENING);
  }

  async finishOpenChest(userChestId: number): Promise<Loot> {
    const { parentChestId, state, startOpeningAt } = await this.checkUserHasChest(userChestId);
    if ( state !== ChestState.OPENING) throw createErrorObject(USER_CHEST_STATE_INVALID);
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