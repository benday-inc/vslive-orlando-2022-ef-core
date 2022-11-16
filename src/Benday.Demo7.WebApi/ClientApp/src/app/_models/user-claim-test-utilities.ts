import { UserClaim } from './user-claim';
import { User } from './user';

export class UserClaimTestUtilities {
  public static getFakeUserClaims(numberOfFakeRecords: number): UserClaim[] {
    const returnValues: UserClaim[] = new Array<UserClaim>(numberOfFakeRecords);

    let temp: UserClaim;

    for (let index = 0; index < numberOfFakeRecords; index++) {
      temp = this.getFakeUserClaim(index);

      returnValues[index] = temp;
    }

    return returnValues;
  }

  public static getFakeUserClaim(itemNumber: number = 0): UserClaim {
    const temp = new UserClaim();
    const itemNumberAsString = itemNumber.toString();

    temp.username = 'fake username' + itemNumberAsString;
    temp.claimName = 'fake claim name' + itemNumberAsString;
    temp.claimValue = 'fake claim value' + itemNumberAsString;
    temp.userId = 'UserId'.length + itemNumber;
    temp.claimLogicType =
      'fake claim type (normal / date)' + itemNumberAsString;
    temp.startDate = new Date(new Date().getDate() + itemNumber);
    temp.endDate = new Date(new Date().getDate() + itemNumber);
    temp.id = 'Id'.length + itemNumber;
    temp.status = 'fake Status' + itemNumberAsString;
    temp.createdBy = 'fake Created By' + itemNumberAsString;
    temp.createdDate = new Date(new Date().getDate() + itemNumber);
    temp.lastModifiedBy = 'fake Last Modified By' + itemNumberAsString;
    temp.lastModifiedDate = new Date(new Date().getDate() + itemNumber);
    temp.timestamp = 'fake Timestamp' + itemNumberAsString;

    return temp;
  }
}
