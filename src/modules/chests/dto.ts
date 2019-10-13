import { Chest, UserChest } from "./entity";


export const wrapChest = (chest: Chest) => ({});
export const wrapUserChest = (userChest: UserChest) => ({});

export type WrappedChest = ReturnType<typeof wrapChest>;
export type WrappedUserChest = ReturnType<typeof wrapUserChest>;