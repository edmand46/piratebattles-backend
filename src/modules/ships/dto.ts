import { Ship, UserShip } from "./entity";

export type WrappedShip = ReturnType<typeof wrapShip>;

export const wrapUserShip = ({ userShipId, name, resource }: UserShip) => ({ userShipId, name, resource });
export const wrapShip = ({ shipId, name, resource }: Ship) => ({ shipId, name, resource });