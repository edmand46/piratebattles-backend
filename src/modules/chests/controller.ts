import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { ChestsManager } from "./manager";
import { AuthorizedRequest } from "../users/middleware";
import { OpenChestDTO, wrapChest, wrapLoot, wrapUserChest } from "./dto";


@injectable()
export class ChestsController {
  @inject(TYPES.ChestsManager) private chestsManager: ChestsManager;

  async startOpening(req: AuthorizedRequest<OpenChestDTO>, reply) {
    const { userChestId } = req.body;
    const chest = await this.chestsManager.startChestOpening(userChestId);
    reply.send(wrapUserChest(chest));
  }

  async finishOpening(req: AuthorizedRequest<OpenChestDTO>, reply) {
    const { userChestId, immediatly } = req.body;
    const loot = await this.chestsManager.finishOpenChest(userChestId, immediatly);
    reply.send(wrapLoot(loot));
  }
}