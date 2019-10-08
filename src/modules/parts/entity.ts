enum PartType {
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
  partId: number;
  level: number;
  count: number;
  createdAt?: Date;
}