import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { LoginUserDTO } from "./dto";
import { FastifyRequest } from "fastify";
import { UsersManager } from "./manager";
import { SessionsManager } from "../sessions/manager";

@injectable()
export class UsersController {
  @inject(TYPES.UsersManager) private usersManager: UsersManager;
  @inject(TYPES.SessionsManager) private sessionsManager: SessionsManager;

  async login(req: FastifyRequest<LoginUserDTO>, reply) {
    const { body } = req;
    const user = await this.usersManager.loginByDeviceId(body);
    const session = await this.sessionsManager.createSession(user.userId);
    reply.send({ user, session });
  }
}

