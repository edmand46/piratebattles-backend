import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { ShipsManager } from "./manager";
import { AuthorizedRequest } from "../users/middleware";
import { SetUserShipPartsDTO } from "./dto";

@injectable()
export class ShipsController {
  @inject(TYPES.ShipsManager) private shipsManager: ShipsManager;

  async setShipParts(req: AuthorizedRequest<SetUserShipPartsDTO>, reply): Promise<void> {
    const { userShipId, bodyId, gunId, sailId } = req.body;
    return this.shipsManager.setParts(userShipId, [bodyId, gunId, sailId]);
  }
}