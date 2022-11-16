import { Person } from './person';

export class PersonTestUtilities {
  public static getFakePersons(numberOfFakeRecords: number): Person[] {
    const returnValues: Person[] = new Array<Person>(numberOfFakeRecords);

    let temp: Person;

    for (let index = 0; index < numberOfFakeRecords; index++) {
      temp = this.getFakePerson(index);

      returnValues[index] = temp;
    }

    return returnValues;
  }

  public static getFakePerson(itemNumber: number = 0): Person {
    const temp = new Person();
    const itemNumberAsString = itemNumber.toString();

    temp.firstName = 'fake First name' + itemNumberAsString;
    temp.lastName = 'fake Last name' + itemNumberAsString;
    temp.emailAddress = 'fake Email address' + itemNumberAsString;
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
