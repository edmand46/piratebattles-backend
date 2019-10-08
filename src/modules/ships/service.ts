import { injectable } from "inversify";
import { Ship } from "./entity";

const SHIPS = 'ships';
const USER_SHIPS = 'user_ships';

@injectable()
export class ShisService {
  async createShip(): Promise<Ship> {
    return;
  }

  getShip() {

  }

  addShipToUser() {

  }

  getShipsOfUser(userId: number) {

  }
}