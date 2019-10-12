import { inject, injectable } from "inversify";
import { SaveBattleDTO } from "./dto";
import { AuthorizedRequest } from "../users/middleware";
import { BattlesManager } from "./manager";
import { TYPES } from "../../inverisify/types";


@injectable()
export class BattlesController {
  @inject(TYPES.BattlesManager) battlesManager: BattlesManager;
  saveBattle(req: AuthorizedRequest<SaveBattleDTO>, reply) {
    const battleData = req.body;
    const reward = this.battlesManager.saveBattleForUser(req.user, battleData);
    reply.send(reward);
  }
}