
export enum ChestState {
  OPENED = 'opened',
  CLOSED = 'closed',
  OPENING = 'opening',
}

export class BaseParamsChest {
  name: string;
  timeToOpen: number;
  openImmedatlyPrice: number;
  resource: string;
}

export class Chest extends BaseParamsChest {
  chestId?: number;
  createdAt: Date;
}

export class UserChest extends BaseParamsChest {
  userChestId?: number;
  parentChestId: number;
  state: ChestState;
  startOpeningAt: Date;
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