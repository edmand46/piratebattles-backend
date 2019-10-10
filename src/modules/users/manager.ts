import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { WrappedUser, wrapUser } from "./dto";
import { AccountsService } from "../accounts/service";
import { UsersService } from "./service";
import { User } from "./entity";
import { createErrorObject } from "../../utils";
import * as errors from "../../constants";
import { ShipsManager } from "../ships/manager";
import { PartsManager } from "../parts/manager";

@injectable()
export class UsersManager {
  @inject(TYPES.AccountsService) private accountsService: AccountsService;
  @inject(TYPES.UsersService) private usersService: UsersService;
  @inject(TYPES.ShipsManager) private shipsManager: ShipsManager;
  @inject(TYPES.PartsManager) private partsManager: PartsManager;

  async loginViaDeviceId(deviceId: string): Promise<WrappedUser> {
    const accounts = await this.accountsService.getAccountByDeviceId(deviceId);
    if (accounts.length > 0) {
      const [acc] = accounts;
      const user = await this.usersService.getUserById(acc.userId);
      return wrapUser(user, accounts);
    }

    throw createErrorObject(errors.USER_NOT_FOUND);
  }

  async registerViaDeviceId(name: string, deviceId: string): Promise<WrappedUser> {
    const accounts = await this.accountsService.getAccountByDeviceId(deviceId);
    if (accounts.length > 0) {
      throw createErrorObject(errors.DEVICE_ALREADY_LINKED);
    }

    const starterShipId = 1;
    const userData: User = {
      level: 1,
      xp: 0,
      gold: 100,
      keys: 5,
      name,
      passwordHash: '',
    };

    const user = await this.usersService.createUser(userData);
    const account = await this.accountsService.linkAccountByDeviceId(user.userId, deviceId);

    await this.shipsManager.giveShipUser(user.userId, starterShipId);

    return wrapUser(user, [account]);
  }
}