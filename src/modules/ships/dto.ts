import { Ship, UserShip } from "./entity";

export type WrappedShip = ReturnType<typeof wrapShip>;

export const wrapUserShip = ({ userShipId, name, resource, gunId, bodyId, sailId }: UserShip) => ({
  userShipId,
  name,
  resource,
  gunId,
  bodyId,
  sailId
});

export const wrapShip = ({ shipId, name, resource, gunId, bodyId, sailId }: Ship) => ({
  shipId,
  name,
  resource,
  gunId,
  bodyId,
  sailId
});