export enum ChestState {
  OPENED = 'opened',
  CLOSED = 'closed',
  OPENING = 'opening'
}

export class Chest {
  chestId?: number;
  name: string;
  timeToOpen: number;
  openImmedatlyPrice: number;
  resource: string;
  createdAt: Date;
}

export class UserChest {
  userChestId?: number;
  parentChestId: number;
  state: ChestState;
  startOpenedAt: Date;
  createdAt: Date;
}

export class Loot {
  lootId?: number;
  chestId: number;
  dropChance: number;
  partId: string;
  gold: number;
  keys: number;
  count: number;
  createdAt: Date;
}