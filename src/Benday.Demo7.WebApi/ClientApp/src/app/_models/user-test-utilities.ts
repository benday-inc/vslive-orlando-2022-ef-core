import { User } from './user';
import { UserClaim } from './user-claim';

export class UserTestUtilities {
  public static getFakeUsers(numberOfFakeRecords: number): User[] {
    const returnValues: User[] = new Array<User>(numberOfFakeRecords);

    let temp: User;

    for (let index = 0; index < numberOfFakeRecords; index++) {
      temp = this.getFakeUser(index);

      returnValues[index] = temp;
    }

    return returnValues;
  }

  public static getFakeUser(itemNumber: number = 0): User {
    const temp = new User();
    const itemNumberAsString = itemNumber.toString();

    temp.username = 'fake username' + itemNumberAsString;
    temp.source = 'fake Source' + itemNumberAsString;
    temp.emailAddress = 'fake email address' + itemNumberAsString;
    temp.firstName = 'fake first name' + itemNumberAsString;
    temp.lastName = 'fake last name' + itemNumberAsString;
    temp.phoneNumber = 'fake phone number' + itemNumberAsString;
    // temp.claims = ;
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
