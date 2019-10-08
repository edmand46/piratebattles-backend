export enum TypeAccount {
  DEVICE_ID = 'device_id',
  GAME_CENTER = 'game_center',
  GOOGLE_PLAY = 'google_play',
  EMAIL_AND_PASSWORD = 'email_and_password',
}

export interface Data {
  [key: string]: string;
}

export class Account {
  accountId?: number;
  type: TypeAccount;
  data: Data;
  userId: number;
}
