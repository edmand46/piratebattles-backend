import { inject, injectable } from "inversify";
import { Ship, UserShip } from "./entity";
import { database } from "../../database/database";
import { PartsService } from "../parts/service";
import { TYPES } from "../../inverisify/types";
import { User } from "../users/entity";

const SHIPS = 'ships';
const USER_SHIPS = 'user_ships';

@injectable()
export class ShipsService {

  async createShip(): Promise<Ship> {
    return;
  }

  createUserShip(userShip: UserShip): Promise<void> {
    return database(USER_SHIPS).insert(userShip);
  }

  getShip(shipId: number): Promise<Ship> {
    return database(SHIPS).where({ shipId }).first();
  }

  getShips(): Promise<Ship[]> {
    return database(SHIPS).where({});
  }

  async getShipsOfUser(userId: number): Promise<UserShip[]> {
    const { rows } = await database.raw(`select public.user_ships.*, public.ships.resource from user_ships left join ships on user_ships."parentShipId" = "shipId" where "userId" = ?;`, [userId])
    return rows;
  }

  async getUserShipById(userShipId: number): Promise<UserShip> {
    const { rows: [ship] } = await database.raw(`select public.user_ships.*, public.ships.resource from user_ships left join ships on user_ships."parentShipId" = "shipId" where "userShipId" = ?;`, [userShipId])
    return ship;
  }

  async updateShip(userShipId: number, data: Partial<UserShip>): Promise<UserShip> {
    await database(USER_SHIPS).where({ userShipId }).update(data);
    return this.getUserShipById(userShipId);
  }
}