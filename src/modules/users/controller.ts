import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { FastifyRequest } from "fastify";
import { UsersManager } from "./manager";
import { SessionsManager } from "../sessions/manager";
import { CreateSessionViaDeviceIdDTO } from "../sessions/dto";
import { CreateUserViaDeviceIdDTO } from "./dto";
import { ShipsManager } from "../ships/manager";
import { PartsManager } from "../parts/manager";

@injectable()
export class UsersController {
  @inject(TYPES.UsersManager) private usersManager: UsersManager;
  @inject(TYPES.SessionsManager) private sessionsManager: SessionsManager;
  @inject(TYPES.ShipsManager) private shipsManager: ShipsManager;
  @inject(TYPES.PartsManager) private partsManager: PartsManager;

  async registerViaDeviceId(req: FastifyRequest<null, null, null, null, CreateUserViaDeviceIdDTO>, reply) {
    const { deviceId, name } = req.body;
    const user = await this.usersManager.registerViaDeviceId(name, deviceId);
    const session = await this.sessionsManager.createSession(user.userId);
    const parts = await this.partsManager.getPartsForUser(user.userId);
    const ships = await this.shipsManager.getShipsForPlayer(user.userId);
    reply.send({ user, session, ships, parts });
  }
}

