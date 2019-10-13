import { Session } from "./entity";

export const wrapSession = ({ token, expiredAt }: Session) => ({ expiredAt, token });