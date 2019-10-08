import * as usersDto from './modules/users/dto';
import { appContainer } from "./inverisify/container";
import { TYPES } from "./inverisify/types";
import { UsersController } from "./modules/users/controller";

const hideDto = {
  hide: true,
};

const anyDto = {
  tags: ['any'],
};

export function routes(fastify, opts, next) {
  fastify.get('/', { schema: hideDto }, (req, reply) => reply.send('Works'));
  fastify.post('/users', { schema: usersDto.LoginUserDTOSchema }, (req, reply) => appContainer.get<UsersController>(TYPES.UsersController).login(req, reply));
  next();
}
