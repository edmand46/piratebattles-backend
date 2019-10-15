import { Account } from "../accounts/entity";
import { User } from "./entity";
import { Session } from "../sessions/entity";
import { UserShip } from "../ships/entity";
import { UserPart } from "../parts/entity";
import { wrapAccount } from "../accounts/dto";
import { wrapSession } from "../sessions/dto";
import { wrapUserShip } from "../ships/dto";
import { wrapUserPart } from "../parts/dto";
import { UserChest } from "../chests/entity";
import { wrapUserChest } from "../chests/dto";
import levels from "./data/levels";

const tags = ['users'];

export class UpdateUserDTO {
  name: string;
}

export const UpdateUserDTOSchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' }
    },
    required: ['name'],
  },
  tags,
}

export interface RegisterViaDeviceIdDTO {
  deviceId: string;
  name: string,
}

export const RegisterViaDeviceIdDTOSchema = {
  body: {
    type: 'object',
    properties: {
      deviceId: { type: 'string' },
      name: { type: 'string' },
    },
    required: ['deviceId', 'name'],
  },
  tags,
};

export interface LoginViaDeviceIdDTO {
  deviceId: string;
}

export const LoginViaDeviceIdDTOSchema = {
  body: {
    type: 'object',
    properties: {
      deviceId: { type: 'string' }
    },
    required: ['deviceId'],
  },
  tags,
};


export const wrapProfile = (user: User, session: Session, ships: UserShip[], parts: UserPart[], chests: UserChest[]) => ({
  user: wrapUser(user),
  session: wrapSession(session),
  userShips: ships.map(wrapUserShip),
  userParts: parts.map(wrapUserPart),
  userChests: chests.map(wrapUserChest),
});

export const wrapUser = ({ name, level, xp, userId, accounts, gold, crystals}: User) => ({
  userId,
  level,
  xp: Math.round(xp * 100 / levels[level]),
  name,
  gold,
  crystals,
  accounts: accounts.map(wrapAccount)
});
