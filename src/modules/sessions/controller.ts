import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { UsersManager } from "../users/manager";
import { SessionsManager } from "./manager";
import { FastifyRequest } from "fastify";
import { CreateSessionViaDeviceIdDTO } from "./dto";
import { ShipsManager } from "../ships/manager";
import { PartsManager } from "../parts/manager";

@injectable()
export class SessionsController {
  @inject(TYPES.UsersManager) private usersManager: UsersManager;
  @inject(TYPES.SessionsManager) private sessionsManager: SessionsManager;
  @inject(TYPES.ShipsManager) private shipsManager: ShipsManager;
  @inject(TYPES.PartsManager) private partsManager: PartsManager;

  async loginViaDeviceId(req: FastifyRequest<null, null, null, null, CreateSessionViaDeviceIdDTO>, reply) {
    const { deviceId } = req.body;
    const user = await this.usersManager.getOrCreateUserByDeviceId(deviceId);
    const session = await this.sessionsManager.createSession(user.userId);
    const parts = await this.partsManager.getPartsForUser(user.userId);
    const ships = await this.shipsManager.getShipsForPlayer(user.userId);
    reply.send({ user, session, ships, parts });
  }
}

