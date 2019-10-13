import { Chest, UserChest } from "./entity";

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


export const wrapChest = (chest: Chest) => ({});
export const wrapUserChest = (userChest: UserChest) => ({});

export type WrappedChest = ReturnType<typeof wrapChest>;
export type WrappedUserChest = ReturnType<typeof wrapUserChest>;