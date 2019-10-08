import { injectable } from "inversify";
import { Ship } from "./entity";

const SHIPS = 'ships';
const USER_SHIPS = 'user_ships';

@injectable()
export class ShipsService {
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