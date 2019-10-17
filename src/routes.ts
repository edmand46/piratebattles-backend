import * as usersDto from './modules/users/dto';
import * as battlesDto from './modules/battles/dto';
import * as chestsDto from './modules/chests/dto';
import * as shipsDto from './modules/ships/dto';

import { appContainer } from "./inverisify/container";
import { TYPES } from "./inverisify/types";
import { UsersController } from "./modules/users/controller";
import { BattlesController } from "./modules/battles/controller";
import { auth } from "./modules/users/middleware";
import { ChestsController } from "./modules/chests/controller";
import { ShipsController } from "./modules/ships/controller";

const hideDto = {
  hide: true,
};

const anyDto = {
  tags: ['any'],
};

export function routes(fastify, opts, next) {
  fastify.get('/', { schema: hideDto }, (req, reply) => reply.send('Works'));
  fastify.post('/users/register', { schema: usersDto.RegisterViaDeviceIdDTOSchema }, (req, reply) => appContainer.get<UsersController>(TYPES.UsersController).registerViaDeviceId(req, reply));
  fastify.post('/users/login', { schema: usersDto.LoginViaDeviceIdDTOSchema }, (req, reply) => appContainer.get<UsersController>(TYPES.UsersController).loginViaDeviceId(req, reply));

  fastify.post('/battles/results', { schema: battlesDto.SaveBattleDTOSchema, preHandler: [auth()] }, (req, reply) => appContainer.get<BattlesController>(TYPES.BattlesController).saveBattle(req, reply));

  fastify.post('/chests/open', { schema: chestsDto.OpenChestDTOSchema, preHandler: [auth()] }, (req, reply) => appContainer.get<ChestsController>(TYPES.ChestsController).startOpening(req, reply));
  fastify.post('/chests/loot', { schema: chestsDto.OpenChestDTOSchema, preHandler: [auth()] }, (req, reply) => appContainer.get<ChestsController>(TYPES.ChestsController).finishOpening(req, reply));

  fastify.post('/ships/save', { schema: shipsDto.SetUserShipPartsDTOSchema, preHandler: [auth()]}, (req, reply) => appContainer.get<ShipsController>(TYPES.ShipsController).setShipParts(req, reply));
  next();
}
