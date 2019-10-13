import { inject, injectable } from "inversify";
import { SessionsService } from "./service";
import { TYPES } from "../../inverisify/types";
import { wrapSession } from "./dto";
import { UsersManager } from "../users/manager";
import { Session } from "./entity";

type WrappedSession = ReturnType<typeof wrapSession>;

@injectable()
export class SessionsManager {
  @inject(TYPES.UsersManager) private usersManager: UsersManager;
  @inject(TYPES.SessionsService) private sessionsService: SessionsService;

  async createSession(userId: number): Promise<Session> {
    return this.sessionsService.createSession(userId);
  }
}