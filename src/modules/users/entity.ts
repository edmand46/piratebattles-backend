export class User {
  userId?: number;
  name: string;
  passwordHash: string;
  gold: number;
  keys: number;
  level: number;
  xp: number;
  accounts?: Account[];
}
