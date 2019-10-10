export class BaseShipParams {
  name: string;
  bodyId: number;
  sailId: number;
  gunId: number;
  resource?: string;
}

export class Ship extends BaseShipParams {
  shipId?: number;
  createdAt?: Date;
}

export class UserShip extends BaseShipParams {
  userShipId?: number;
  parentShipId: number;
  createdAt?: Date;
}