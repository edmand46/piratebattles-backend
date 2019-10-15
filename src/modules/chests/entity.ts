
export enum ChestState {
  OPENED = 'opened',
  CLOSED = 'closed',
  OPENING = 'opening',
}

export interface IDBChest {
  timeToOpen: number;
  openImmediatlyPrice: number;
  resource: string;
}

export interface IDBUserChest {
  userChestId?: number;
  parentChestId: number;
  userId: number,
  state?: ChestState;
  startOpeningAt?: Date;
  createdAt?: Date;
}

export class Chest implements IDBChest {
  chestId?: number;
  createdAt: Date;
  timeToOpen: number;
  openImmediatlyPrice: number;
  resource: string;
}

export class UserChest implements IDBChest, IDBUserChest {
  userChestId?: number;
  parentChestId: number;
  state: ChestState;
  startOpeningAt: Date;
  createdAt: Date;
  timeToOpen: number;
  name: string;
  openImmediatlyPrice: number;
  resource: string;
  userId: number;
}

export class Loot {
  lootId?: number;
  chestId: number;
  dropChance: number;
  partId: string;
  gold: number;
  crystals: number;
  count: number;
  createdAt: Date;
}