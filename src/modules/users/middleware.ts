import * as moment from 'moment';
import { isNil } from 'lodash';
import { appContainer } from '../../inverisify/container';
import { SessionsService } from "../sessions/service";
import { TYPES } from "../../inverisify/types";
import { UsersService } from "./service";
import { FastifyRequest } from "fastify";
import { User } from "./entity";

export type AuthorizedRequest<T> = FastifyRequest<null, null, null, null, T> & { user: User };

export const auth = () => async (req, reply) => {
  const sessionService = appContainer.get<SessionsService>(TYPES.SessionsService);
  const usersService = appContainer.get<UsersService>(TYPES.UsersService);

  const header = req.headers['authorization'];
  if (isNil(header))
    return reply.unauthorized('you are not authorized');

  const bearer = 'Bearer';
  const token = header.substr(bearer.length, header.length).trim();
  const session = await sessionService.getSessionByToken(token);

  if (isNil(session))
    reply.unauthorized('session not found');

  const { userId, expiredAt } = session;
  const expireAt = moment(expiredAt);
  const now = moment();

  const diff = expireAt.diff(now);
  if (diff <= 0)
    return reply.unauthorized('session expired');

  const user = await usersService.getUserById(userId);
  if (isNil(user))
    return reply.internalServerError('user not found');

  req.user = user;
};