import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { ShipsService } from "./service";
import { UserShip } from "./entity";
import { PartsManager } from "../parts/manager";

@injectable()
export class ShipsManager {
  @inject(TYPES.ShipsService) private shipsService: ShipsService;
  @inject(TYPES.PartsManager) private partsManager: PartsManager;

  async giveShipUser(userId: number, catalogShipId: number): Promise<void> {
    const { shipId, bodyId, gunId, sailId, name } = await this.shipsService.getShip(catalogShipId);
    const userShip: UserShip = { parentShipId: shipId, sailId, gunId, name, bodyId, userId };
    console.log(userShip);
    await Promise.all([
      this.shipsService.createUserShip(userShip),
      this.partsManager.givePartsToUser(userId, [bodyId, gunId, sailId]),
    ]).catch(console.error);
  }

  async getShipsForPlayer(userId: number) {
    return this.shipsService.getShipsOfUser(userId);
  }
}