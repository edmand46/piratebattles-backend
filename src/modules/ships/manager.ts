import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { ShipsService } from "./service";


@injectable()
export class ShipsManager {
  @inject(TYPES.ShipsService) private shipsService: ShipsService;


}