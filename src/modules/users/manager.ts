import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { LoginUserDTO, wrapUser } from "./dto";
import { AccountsService } from "../accounts/service";
import { UsersService } from "./service";
import { User } from "./entity";

type WrappedUser = ReturnType<typeof wrapUser>;

@injectable()
export class UsersManager {
  @inject(TYPES.AccountsService) private accountsService: AccountsService;
  @inject(TYPES.UsersService) private usersService: UsersService;

  async loginByDeviceId({ deviceId }: LoginUserDTO): Promise<WrappedUser> {
    const accounts = await this.accountsService.getAccountByDeviceId(deviceId);
    if (accounts.length > 0) {
      const [acc] = accounts;
      const user = await this.usersService.getUserById(acc.userId);
      return wrapUser(user, accounts);
    }

    const userData: User = {
      level: 1,
      xp: 0,
      name: 'User',
      passwordHash: '',
    };

    const user = await this.usersService.createUser(userData);
    const account = await this.accountsService.linkAccountByDeviceId(user.userId, deviceId);

    return wrapUser(user, [account]);
  }
}