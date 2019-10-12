import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { UsersManager } from "../users/manager";
import { BattleRewardData, SaveBattleDTO } from "./dto";
import { User } from "../users/entity";

@injectable()
export class BattlesManager {
  @inject(TYPES.UsersManager) usersManager: UsersManager;

  async saveBattleForUser(user: User, battleData: SaveBattleDTO): Promise<BattleRewardData> {
    const { level } = user;
    const { Duration } = battleData;

    const addedXp = Duration / level;
    const updatedUser = await this.usersManager.addValue(user, addedXp);
    const levelUp = updatedUser.level - level > 0;

    return { xp: addedXp, user: updatedUser, chest: null, levelUpReward: null };
  }
}