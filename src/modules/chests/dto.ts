import { Chest, Loot, UserChest } from "./entity";

const tags = ['chests'];

export class OpenChestDTO {
  userChestId?: number
}

export const OpenChestDTOSchema = {
  body: {
    type: 'object',
    properties: {
      userChestId: { type: 'integer' }
    },
    required: ['userChestId'],
  },
  tags,
};


export const wrapChest = ({ openImmediatlyPrice, resource, timeToOpen, chestId }: Chest) => ({
  chestId,
  openImmediatlyPrice,
  resource,
  timeToOpen
});

export const wrapUserChest = ({ openImmediatlyPrice, resource, startOpeningAt, state, timeToOpen, userChestId }: UserChest) => ({
  userChestId,
  openImmediatlyPrice,
  resource,
  startOpeningAt,
  state,
  timeToOpen,
});

export const wrapLoot = ({ count, crystals, gold, partId }: Loot) => ({ count, crystals, gold, partId });

export type WrappedChest = ReturnType<typeof wrapChest>;
export type WrappedUserChest = ReturnType<typeof wrapUserChest>;