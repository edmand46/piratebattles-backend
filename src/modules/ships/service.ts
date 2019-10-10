import { inject, injectable } from "inversify";
import { Ship, UserShip } from "./entity";
import { database } from "../../database/database";
import { PartsService } from "../parts/service";
import { TYPES } from "../../inverisify/types";

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

  async getShipsOfUser(userId: number): Promise<UserShip[]> {
    const { rows } = await database.raw(`select public.user_ships.*, public.ships.resource from user_ships left join ships on user_ships."parentShipId" = "shipId" where "userId" = ?;`, [userId])
    return rows;
  }
}