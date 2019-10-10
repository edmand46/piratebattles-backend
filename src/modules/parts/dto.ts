import { Part, UserPart } from "./entity";

export type WrappedUserPart = ReturnType<typeof wrapUserPart>
export const wrapUserPart = ({ userPartId, type, count, level, resource }: (UserPart & Part)) => ({ userPartId, type, count, level, resource });