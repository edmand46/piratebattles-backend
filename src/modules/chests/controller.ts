import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { ChestsManager } from "./manager";
import { AuthorizedRequest } from "../users/middleware";
import { OpenChestDTO, wrapChest, wrapLoot } from "./dto";


@injectable()
export class ChestsController {
  @inject(TYPES.ChestsManager) private chestsManager: ChestsManager;

  async startOpening(req: AuthorizedRequest<OpenChestDTO>, reply) {
    const { userChestId } = req.body;
    const chest = await this.chestsManager.startChestOpening(userChestId);
    reply.send({
      chest: wrapChest(chest)
    });
  }

  async finishOpening(req: AuthorizedRequest<OpenChestDTO>, reply) {
    const { userChestId } = req.body;
    const loot = await this.chestsManager.finishOpenChest(userChestId);
    reply.send({
      loot: wrapLoot(loot)
    });
  }
}