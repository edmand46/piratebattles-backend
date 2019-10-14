import { inject, injectable } from "inversify";
import { database } from "../../database/database";
import { Session } from "./entity";

const SESSIONS = 'sessions';

@injectable()
export class SessionsService {
  async createSession(userId: number, token: string, expiredAt: Date): Promise<Session> {
    const session: Session = { token, userId, expiredAt };
    const [sessionId] = await database(SESSIONS).insert(session).returning('sessionId');
    return this.getSessionById(sessionId);
  }

  async getSessionById(sessionId: number): Promise<Session> {
    return database(SESSIONS).where({ sessionId }).first();
  }

  async getSessionByToken(token: string): Promise<Session> {
    return database(SESSIONS).where({ token }).first();
  }
}