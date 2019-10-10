import { Session } from "./entity";

const tags = ['sessions'];

export interface CreateSessionViaDeviceIdDTO {
  deviceId: string;
}

export const CreateSessionViaDeviceIdDTOSchema = {
  body: {
    type: 'object',
    properties: {
      deviceId: { type: 'string' }
    },
    required: ['deviceId'],
  },
  tags,
};


export const wrapSession = ({ token, expiredAt }: Session) => ({ expiredAt, token });