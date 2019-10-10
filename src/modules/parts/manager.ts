import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { Part, UserPart } from "./entity";
import { WrappedUserPart, wrapUserPart } from "./dto";
import { PartsService } from "./service";


@injectable()
export class PartsManager {
  @inject(TYPES.PartsService) private partsService : PartsService;

  async getPartsForUser(userId: number) : Promise<WrappedUserPart[]> {
    const userParts = await this.partsService.getUserParts(userId);
    return userParts.map((p) => wrapUserPart(p));
  }

  async givePartsToUser(userId: number, parts: number[]): Promise<void> {
    return this.partsService.givePartsToUser(userId, parts);
  }
}