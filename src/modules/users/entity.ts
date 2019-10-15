import { Account } from "../accounts/entity";

export enum Role {
  PLAYER = 'player',
  ADMIN = 'admin',
}

export class User {
  userId?: number;
  name: string;
  role: Role;
  passwordHash: string;
  gold: number;
  crystals: number;
  level: number;
  xp: number;
  accounts?: Account[];
}
