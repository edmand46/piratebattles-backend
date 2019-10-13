import { Account } from "../accounts/entity";
import { User } from "./entity";
import { Session } from "../sessions/entity";
import { UserShip } from "../ships/entity";
import { UserPart } from "../parts/entity";
import { wrapAccount } from "../accounts/dto";
import { wrapSession } from "../sessions/dto";
import { wrapUserShip } from "../ships/dto";
import { wrapUserPart } from "../parts/dto";

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

export interface CreateUserViaDeviceIdDTO {
  deviceId: string;
  name: string,
}

export const CreateUserViaDeviceIdDTOSchema = {
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



export const wrapProfile = (user: User, session: Session, ships: UserShip[], parts: UserPart[]) => ({
  user: wrapUser(user),
  session: wrapSession(session),
  ships: ships.map(wrapUserShip),
  parts: parts.map(wrapUserPart),
});

export const wrapUser = ({ name, level, xp, userId, accounts }: User) => ({
  userId,
  level,
  xp,
  name,
  accounts: accounts.map(wrapAccount)
});
