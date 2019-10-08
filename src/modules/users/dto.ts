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


export const wrapAccount = ({ accountId, type }: Account) => ({
  accountId,
  type
});

export const wrapUser = ({ name, level, xp, userId }: User, accounts: Account[]) => ({
  userId,
  level,
  xp,
  name,
  accounts: accounts.map(wrapAccount)
});
