import { inject, injectable } from "inversify";
import { TYPES } from "../../inverisify/types";
import { UsersManager } from "./manager";
import { LoginUserDTO } from "./dto";
import { FastifyRequest } from "fastify";

@injectable()
export class UsersController {
  @inject(TYPES.UsersManager) private usersManager: UsersManager;

  async login(req: FastifyRequest<LoginUserDTO>, reply) {
    const { body } = req;
    const user = await this.usersManager.loginByDeviceId(body);
    reply.send(user);
  }
}

