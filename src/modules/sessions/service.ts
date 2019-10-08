import { inject, injectable } from "inversify";
import { v4 as uuidV4 } from 'uuid';
import { database } from "../../database/database";
import { Session } from "./entity";

const SESSIONS = 'sessions';

@injectable()
export class SessionsService {
  async createSession(userId: number): Promise<Session> {
    const token = uuidV4();
    const expiredAt = new Date();
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