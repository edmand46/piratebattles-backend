import { Account } from "../accounts/entity";
import { User } from "./entity";

const tags = ['users'];

export class UpdateUserDTO {
  name: string;
}

export const UpdateUserDTOSchema = {
  body: {
    name: { type: 'string' }
  },
  tags,
}

export class LoginUserDTO {
  deviceId: string;
}

export const LoginUserDTOSchema = {
  body: {
    deviceId: { type: 'string' }
  },
  tags,
};


export const wrapAccount = ({ accountId, type }: Account) => ({
  accountId,
  type
});

export const wrapUser = ({ name, passwordHash, level, xp, isBanned, userId }: User, accounts: Account[]) => ({
  userId,
  level,
  xp,
  name,
  passwordHash,
  isBanned,
  accounts: accounts.map(wrapAccount)
});
