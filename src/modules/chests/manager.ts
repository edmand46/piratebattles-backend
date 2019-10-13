import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { ChestsService } from "./service";
import { UserChest } from "./entity";
import { WrappedUserChest } from "./dto";
import { User } from "../users/entity";

@injectable()
export class ChestsManager {
  @inject(TYPES.ChestsService) private chestsService: ChestsService;

  getUserChests(): Promise<WrappedUserChest> {

  }

  addChestForUser(user: User, chestId: number) {

  }
}