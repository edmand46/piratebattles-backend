import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { FastifyRequest } from "fastify";
import { UsersManager } from "./manager";
import { SessionsManager } from "../sessions/manager";
import { CreateSessionViaDeviceIdDTO } from "../sessions/dto";
import { CreateUserViaDeviceIdDTO, wrapProfile } from "./dto";
import { ShipsManager } from "../ships/manager";
import { PartsManager } from "../parts/manager";
import { User } from "./entity";
import { ChestsManager } from "../chests/manager";

@injectable()
export class UsersController {
  @inject(TYPES.UsersManager) private usersManager: UsersManager;
  @inject(TYPES.SessionsManager) private sessionsManager: SessionsManager;
  @inject(TYPES.ShipsManager) private shipsManager: ShipsManager;
  @inject(TYPES.PartsManager) private partsManager: PartsManager;
  @inject(TYPES.ChestsManager) private chestsManager: ChestsManager;

  async retrieveProfileData(user: User) {
    const [session, parts, ships, chests] = await Promise.all([
      this.sessionsManager.createSession(user.userId),
      this.partsManager.getPartsForUser(user.userId),
      this.shipsManager.getShipsForPlayer(user.userId),
      this.chestsManager.getUserChests(user.userId),
    ]);
    return wrapProfile(user, session, ships, parts, chests)
  }

  async registerViaDeviceId(req: FastifyRequest<null, null, null, null, CreateUserViaDeviceIdDTO>, reply) {
    const { deviceId, name } = req.body;
    const user = await this.usersManager.registerViaDeviceId(name, deviceId);
    const profile = await this.retrieveProfileData(user);
    reply.send(profile);
  }

  async loginViaDeviceId(req: FastifyRequest<null, null, null, null, CreateSessionViaDeviceIdDTO>, reply) {
    const { deviceId } = req.body;
    const user = await this.usersManager.loginViaDeviceId(deviceId);
    const profile = await this.retrieveProfileData(user);
    reply.send(profile);
  }

}

