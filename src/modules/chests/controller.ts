import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { ChestsManager } from "./manager";
import { AuthorizedRequest } from "../users/middleware";
import { OpenChestDTO, wrapLoot } from "./dto";


@injectable()
export class ChestsController {
  @inject(TYPES.ChestsManager) private chestsManager: ChestsManager;
  async openChest(req: AuthorizedRequest<OpenChestDTO>, reply) {
    const { userChestId } = req.body;
    const loot = await this.chestsManager.startChestOpening(userChestId);
    // reply.send(wrapLoot(loot));
  }
}