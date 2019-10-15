import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { wrapUser } from "./dto";
import { AccountsService } from "../accounts/service";
import { UsersService } from "./service";
import { Role, User } from "./entity";
import { createErrorObject } from "../../utils";
import * as errors from "../../constants";
import { ShipsManager } from "../ships/manager";
import { PartsManager } from "../parts/manager";
import tableLevels from './data/levels';
import { ChestsManager } from "../chests/manager";

@injectable()
export class UsersManager {
  @inject(TYPES.AccountsService) private accountsService: AccountsService;
  @inject(TYPES.UsersService) private usersService: UsersService;
  @inject(TYPES.ShipsManager) private shipsManager: ShipsManager;
  @inject(TYPES.PartsManager) private partsManager: PartsManager;
  @inject(TYPES.ChestsManager) private chestsManager: ChestsManager;

  async loginViaDeviceId(deviceId: string): Promise<User> {
    const accounts = await this.accountsService.getAccountByDeviceId(deviceId);
    if (accounts.length > 0) {
      const [acc] = accounts;
      const user = await this.usersService.getUserById(acc.userId);
      user.accounts = accounts;
      return user;
    }

    throw createErrorObject(errors.USER_NOT_FOUND);
  }

  async registerViaDeviceId(name: string, deviceId: string): Promise<User> {
    const accounts = await this.accountsService.getAccountByDeviceId(deviceId);
    if (accounts.length > 0) {
      throw createErrorObject(errors.DEVICE_ALREADY_LINKED);
    }

    const starterShipId = 1;
    const starterChestId = 1;
    const userData: User = {
      level: 1,
      xp: 0,
      role: Role.PLAYER,
      gold: 100,
      crystals: 5,
      name,
      passwordHash: '',
    };

    const user = await this.usersService.createUser(userData);
    const account = await this.accountsService.linkAccountByDeviceId(user.userId, deviceId);
    user.accounts = [account];

    await this.shipsManager.giveShipUser(user.userId, starterShipId);
    await this.chestsManager.giveChestUser(user.userId, starterChestId);

    return user;
  }

  async addValue(user: User, additionalXP = 0, additionalGold = 0, additionalCrystals = 0): Promise<User> {
    const { userId, xp, crystals, gold, level } = user;
    const nextLevelXP = tableLevels[level];
    const resultCrystals = crystals + additionalCrystals;
    const resultGold = gold + additionalGold;
    let resultXp = xp + additionalXP;
    let resultLevel = level;
    if (resultXp >= nextLevelXP) {
      resultLevel += 1;
      resultXp = 0;
    }
    return this.usersService.updateUserById(userId, {
      xp: resultXp,
      gold: resultGold,
      crystals: resultCrystals,
      level: resultLevel
    })
  }
}