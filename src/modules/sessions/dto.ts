import { Session } from "./entity";

const tags = ['sessions'];

export interface CreateSessionViaDeviceIdDTO {
  deviceId: string;
}

export const CreateSessionViaDeviceIdDTOSchema = {
  body: {
    deviceId: { type: 'string' }
  },
  tags,
};


export const wrapSession = ({ token, expiredAt }: Session) => ({ expiredAt, token });