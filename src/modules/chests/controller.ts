import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { ChestsManager } from "./manager";
import { AuthorizedRequest } from "../users/middleware";
import { OpenChestDTO } from "./dto";


@injectable()
export class ChestsController {
  @inject(TYPES.ChestsManager) private chestsManager: ChestsManager;
  openChest(req: AuthorizedRequest<OpenChestDTO>, reply) {

  }
}