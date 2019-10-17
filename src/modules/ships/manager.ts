import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { ShipsService } from "./service";
import { UserShip } from "./entity";
import { PartsManager } from "../parts/manager";
import { WrappedShip, wrapShip } from "./dto";
import { PartType } from "../parts/entity";

@injectable()
export class ShipsManager {
  @inject(TYPES.ShipsService) private shipsService: ShipsService;
  @inject(TYPES.PartsManager) private partsManager: PartsManager;

  async setParts(userShipId: number, partsIds: number[]) {
    const userParts = await this.partsManager.getPartsForUserByIds(partsIds);
    const data: Partial<UserShip> = {};

    const filteredBodies = userParts.filter(p => p.type === PartType.Body);
    if (filteredBodies.length > 0) {
      data.bodyId = filteredBodies[0].userPartId;
    }

    const filteredGuns = userParts.filter(p => p.type === PartType.Gun);
    if (filteredGuns.length > 0) {
      data.bodyId = filteredGuns[0].userPartId;
    }

    const filteredSail = userParts.filter(p => p.type === PartType.Sail);
    if (filteredSail.length > 0) {
      data.bodyId = filteredSail[0].userPartId;
    }

    this.shipsService.updateShip(userShipId, data);
  }

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