import { inject, injectable } from "inversify";


@injectable()
export class ShipsManager {
  @inject(TYPES.ShipsService) private shipsService: ShipsService;


}