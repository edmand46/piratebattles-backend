import { Part, UserPart } from "./entity";
import levels from "./data/levels";

export type WrappedUserPart = ReturnType<typeof wrapUserPart>;
export const wrapUserPart = ({ userPartId, type, count, level, resource }: (UserPart & Part & { isMaxLevel: boolean })) => ({
  userPartId,
  type,
  count,
  level,
  resource,
  isMaxLevel: level in levels
});