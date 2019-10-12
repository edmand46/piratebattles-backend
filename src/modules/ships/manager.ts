import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { ShipsService } from "./service";
import { Ship, UserShip } from "./entity";
import { PartsManager } from "../parts/manager";
import { WrappedShip, wrapShip, wrapUserShip } from "./dto";

@injectable()
export class ShipsManager {
  @inject(TYPES.ShipsService) private shipsService: ShipsService;
  @inject(TYPES.PartsManager) private partsManager: PartsManager;

  async giveShipUser(userId: number, catalogShipId: number): Promise<void> {
    const { shipId, bodyId, gunId, sailId, name } = await this.shipsService.getShip(catalogShipId);
    const userShip: UserShip = { parentShipId: shipId, sailId, gunId, name, bodyId, userId };
    await Promise.all([
      this.shipsService.createUserShip(userShip),
      this.partsManager.givePartsToUser(userId, [bodyId, gunId, sailId]),
    ]).catch(console.error);
  }

  async getShips(): Promise<WrappedShip[]> {
    const ships = await this.shipsService.getShips();
    return ships.map(s => wrapShip(s));
  }

  async getShipsForPlayer(userId: number) {
    const ships = await this.shipsService.getShipsOfUser(userId);
    return ships.map(s => wrapUserShip(s));
  }
}