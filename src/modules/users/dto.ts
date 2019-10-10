import { Account } from "../accounts/entity";
import { User } from "./entity";

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


export const wrapAccount = ({ accountId, type }: Account) => ({
  accountId,
  type
});

export type WrappedUser = ReturnType<typeof wrapUser>;

export const wrapUser = ({ name, level, xp, userId }: User, accounts: Account[]) => ({
  userId,
  level,
  xp,
  name,
  accounts: accounts.map(wrapAccount)
});
