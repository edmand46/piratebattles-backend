import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { FastifyRequest } from "fastify";
import { UsersManager } from "./manager";
import { SessionsManager } from "../sessions/manager";

@injectable()
export class UsersController {
  @inject(TYPES.UsersManager) private usersManager: UsersManager;
  @inject(TYPES.SessionsManager) private sessionsManager: SessionsManager;

}

