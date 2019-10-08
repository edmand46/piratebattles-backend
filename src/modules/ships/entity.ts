export class BaseShipParams {
  bodyId: number;
  sailId: number;
  gunId: number;
}

export class Ship extends BaseShipParams {
  shipId?: number;
  bodyId: number;
  sailId: number;
  gunId: number;
  createdAt?: Date;
}

export class UserShip extends Ship {
  userShipId?: number
}