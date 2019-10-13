import { Account } from "./entity";

export const wrapAccount = ({ accountId, type }: Account) => ({
  accountId,
  type
});
