import { User } from "../users/entity";
import { Chest } from "../chests/entity";

const tags = ['battles'];

export class SaveBattleDTO {
  Shoots: number;
  Hits: number;
  HitsReceived: number;
  DamageDone: number;
  DamageRecieved: number;
  StartTime: number;
  EndTime: number;
  Duration: number;
}

export const SaveBattleDTOSchema = {
  body: {
    type: 'object',
    properties: {
      Shoots: { type: 'integer' },
      Hits: { type: 'integer' },
      HitsReceived: { type: 'integer' },
      DamageDone: { type: 'integer' },
      DamageReceived: { type: 'integer' },
      StartTime: { type: 'integer' },
      EndTime: { type: 'integer' },
      Duration: { type: 'integer' },
    }
  },
  tags
}


export class LevelUpRewardData {

}

export class BattleRewardData {
  user: User;
  xp: number;
  levelUpReward: LevelUpRewardData;
  chest: Chest;
}