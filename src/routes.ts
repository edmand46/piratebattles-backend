import * as sessionsDto from './modules/sessions/dto';
import * as usersDto from './modules/users/dto';
import { appContainer } from "./inverisify/container";
import { TYPES } from "./inverisify/types";
import { UsersController } from "./modules/users/controller";
import { SessionsController } from "./modules/sessions/controller";
import { User } from "./modules/users/entity";

const hideDto = {
  hide: true,
};

const anyDto = {
  tags: ['any'],
};

export function routes(fastify, opts, next) {
  fastify.get('/', { schema: hideDto }, (req, reply) => reply.send('Works'));
  // fastify.get('/sessions', { schema: sessionsDto.CreateSessionViaDeviceIdDTOSchema }, (req, reply) => appContainer.get<SessionsController>(TYPES.SessionsController).loginViaDeviceId(req, reply));
  fastify.post('/sessions', { schema: sessionsDto.CreateSessionViaDeviceIdDTOSchema }, (req, reply) => appContainer.get<SessionsController>(TYPES.SessionsController).loginViaDeviceId(req, reply));
  fastify.post('/users', { schema: usersDto.CreateUserViaDeviceIdDTOSchema }, (req, reply) => appContainer.get<UsersController>(TYPES.UsersController).registerViaDeviceId(req, reply));
  // fastify.post('/sessions/:id', { schema: sessionsDto.CreateSessionViaDeviceIdDTOSchema }, (req, reply) => appContainer.get<SessionsController>(TYPES.SessionsController).loginViaDeviceId(req, reply));
  // fastify.get('/sessions/:id', { schema: sessionsDto.CreateSessionViaDeviceIdDTOSchema }, (req, reply) => appContainer.get<SessionsController>(TYPES.SessionsController).loginViaDeviceId(req, reply));
  // fastify.delete('/sessions/:id', { schema: sessionsDto.CreateSessionViaDeviceIdDTOSchema }, (req, reply) => appContainer.get<SessionsController>(TYPES.SessionsController).loginViaDeviceId(req, reply));
  next();
}
