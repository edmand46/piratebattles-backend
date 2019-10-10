import { UserShip } from "./entity";

export const wrapUserShip = ({ userShipId, name, resource }: UserShip) => ({ userShipId, name, resource });