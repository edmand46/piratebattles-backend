export class Session {
  sessionId?: number;
  userId: number;
  token: string;
  expiredAt: Date;
  createdAt?: Date;
}