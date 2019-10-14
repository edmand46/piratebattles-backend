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
      Shoots: { type: 'number' },
      Hits: { type: 'number' },
      HitsReceived: { type: 'number' },
      DamageDone: { type: 'number' },
      DamageReceived: { type: 'number' },
      StartTime: { type: 'number' },
      EndTime: { type: 'number' },
      Duration: { type: 'number' },
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