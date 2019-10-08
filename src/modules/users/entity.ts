export class User {
  userId?: number;
  name: string;
  passwordHash: string;
  level: number;
  xp: number;
  accounts?: Account[];
}
