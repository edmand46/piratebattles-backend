import { UserShip } from "./entity";

export const wrapUserShip = ({ userShipId, name }: UserShip) => ({ userShipId, name });