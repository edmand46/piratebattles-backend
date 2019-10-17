import { inject, injectable } from "inversify";
import { isNil } from 'lodash';
import { TYPES } from "../../inverisify/types";
import { ChestsService } from "./service";
import { ChestState, IDBUserChest, Loot, UserChest } from "./entity";
import { createErrorObject } from "../../utils";
import { USER_CHEST_NOT_FOUND, USER_CHEST_STATE_INVALID } from "../../constants";
import * as moment from 'moment';

@injectable()
export class ChestsManager {
  @inject(TYPES.ChestsService) private chestsService: ChestsService;

  async getUserChests(userId: number): Promise<UserChest[]> {
    const chests = await this.chestsService.getUserChestsByUserId(userId);
    return chests.map(c => {
      const { startOpeningAt } = c;
      const time = Math.abs(moment().diff(moment(startOpeningAt)));
      return {
        ...c,
        timeToOpen: time,
      }
    });
  }

  async checkUserHasChest(userChestId: number): Promise<UserChest> {
    const userChest = await this.chestsService.getUserChestsById(userChestId);
    if (isNil(userChest)) throw createErrorObject(USER_CHEST_NOT_FOUND);
    return userChest;
  }

  async startChestOpening(userChestId: number): Promise<UserChest> {
    const { state } = await this.checkUserHasChest(userChestId);
    if (state !== ChestState.CLOSED) throw createErrorObject(USER_CHEST_STATE_INVALID);
    return this.chestsService.updateUserChestState(userChestId, {
      state: ChestState.OPENING,
      startOpeningAt: new Date(),
    });
  }

  async getLoot(parentChestId: number) {
    const loot: Loot[] = await this.chestsService.getLootForChest(parentChestId);
    return loot[Math.floor(Math.random() % loot.length - 1)];
  }

  async finishOpenChest(userChestId: number, immediatly: boolean): Promise<Loot> {
    const { parentChestId, state, startOpeningAt, timeToOpen } = await this.checkUserHasChest(userChestId);
    if (state !== ChestState.OPENING) throw createErrorObject(USER_CHEST_STATE_INVALID);
    if (immediatly) {
      return this.getLoot(parentChestId);
    }
    const time = Math.abs(moment().diff(moment(startOpeningAt)));
    if (time < timeToOpen) throw createErrorObject(USER_CHEST_STATE_INVALID);
    return this.getLoot(parentChestId);
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