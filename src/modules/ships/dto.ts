import { Ship, UserShip } from "./entity";

const tags = ['ships']

export class SetUserShipPartsDTO {
  userShipId: number;
  bodyId: number;
  gunId: number;
  sailId: number;
}

export const SetUserShipPartsDTOSchema = {
  body: {
    type: 'object',
    properties: {
      userShipId: { type: 'integer' },
      bodyId: { type: 'integer' },
      gunId: { type: 'integer' },
      sailId: { type: 'integer' },
    },
    required: ['userShipId', 'bodyId', 'gunId', 'sailId'],
  },
  tags,
};



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