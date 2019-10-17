export enum PartType {
  Sail = 'sail',
  Gun = 'gun',
  Body = 'body',
}

export class Part {
  partId?: number;
  shipId: number;
  type: PartType;
  resource: string;
  createdAt?: Date;
}

export class UserPart {
  userPartId?: number;
  parentPartId: number;
  type: PartType;
  userId: number;
  level: number;
  count: number;
  nextLevelCount: number;
  createdAt?: Date;
}