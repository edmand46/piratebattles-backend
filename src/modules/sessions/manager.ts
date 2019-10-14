import { inject, injectable } from "inversify";
import { SessionsService } from "./service";
import { TYPES } from "../../inverisify/types";
import { wrapSession } from "./dto";
import { UsersManager } from "../users/manager";
import { Session } from "./entity";
import { v4 as uuidV4 } from 'uuid';
import * as moment from "moment";

type WrappedSession = ReturnType<typeof wrapSession>;

@injectable()
export class SessionsManager {
  @inject(TYPES.UsersManager) private usersManager: UsersManager;
  @inject(TYPES.SessionsService) private sessionsService: SessionsService;

  async createSession(userId: number): Promise<Session> {
    const token = uuidV4();
    const expiredAt = moment().add(24, 'hours').toDate();
    return this.sessionsService.createSession(userId, token, expiredAt);
  }
}