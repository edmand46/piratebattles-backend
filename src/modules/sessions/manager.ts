import { inject, injectable } from "inversify";
import { SessionsService } from "./service";
import { TYPES } from "../../inverisify/types";
import { wrapSession } from "./dto";

type WrappedSession = ReturnType<typeof wrapSession>;

@injectable()
export class SessionsManager {
  @inject(TYPES.SessionsService) private sessionsService: SessionsService;

  async createSession(userId: number): Promise<WrappedSession> {
    const session = await this.sessionsService.createSession(userId);
    return wrapSession(session);
  }
}