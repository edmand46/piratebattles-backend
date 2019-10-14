import { injectable } from "inversify";
import { database } from "../../database/database";
import { Part, UserPart } from "./entity";

const PARTS = 'parts';
const USER_PARTS = 'user_parts';

@injectable()
export class PartsService {
  async getUserParts(userId: number): Promise<(UserPart & Part)[]> {
    const { rows } = await database.raw(`select user_parts.*, parts.resource from user_parts left join parts on user_parts."parentPartId" = parts."partId" where "userId" = ?`, [userId])
    return rows;
  }

  async getParts(partsIds: number[]): Promise<Part[]> {
    return database(PARTS).whereIn('partId', partsIds);
  }

  async givePartsToUser(userId: number, partsIds: number[]): Promise<number[]> {
    const parts: Part[] = await this.getParts(partsIds);
    const userParts: UserPart[] = parts.map(({ partId }) => ({ count: 0, level: 1, parentPartId: partId, userId }));
    return database(USER_PARTS).insert(userParts).returning('userPartId');
  }
}