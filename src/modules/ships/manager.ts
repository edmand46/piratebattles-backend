import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { ShipsService } from "./service";
import { Ship, UserShip } from "./entity";
import { PartsManager } from "../parts/manager";
import { WrappedShip, wrapShip, wrapUserShip } from "./dto";
import { UserPart } from "../parts/entity";

@injectable()
export class ShipsManager {
  @inject(TYPES.ShipsService) private shipsService: ShipsService;
  @inject(TYPES.PartsManager) private partsManager: PartsManager;

  async giveShipUser(userId: number, catalogShipId: number): Promise<void> {
    const { shipId, bodyId, gunId, sailId, name } = await this.shipsService.getShip(catalogShipId);
    const [userBodyId, userGunId, sailGunId] = await this.partsManager.givePartsToUser(userId, [bodyId, gunId, sailId]);
    const userShip: UserShip = {
      name,
      userId,
      parentShipId: shipId,
      sailId: sailGunId,
      gunId: userGunId,
      bodyId: userBodyId
    };
    await this.shipsService.createUserShip(userShip);
  }

  async getShips(): Promise<WrappedShip[]> {
    const ships = await this.shipsService.getShips();
    return ships.map(s => wrapShip(s));
  }

  async getShipsForPlayer(userId: number) {
    return await this.shipsService.getShipsOfUser(userId);
  }
}