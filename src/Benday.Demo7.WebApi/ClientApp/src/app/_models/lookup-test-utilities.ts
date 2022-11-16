import { Lookup } from './lookup';

export class LookupTestUtilities {
  public static getFakeLookups(numberOfFakeRecords: number): Lookup[] {
    const returnValues: Lookup[] = new Array<Lookup>(numberOfFakeRecords);

    let temp: Lookup;

    for (let index = 0; index < numberOfFakeRecords; index++) {
      temp = this.getFakeLookup(index);

      returnValues[index] = temp;
    }

    return returnValues;
  }

  public static getFakeLookup(itemNumber: number = 0): Lookup {
    const temp = new Lookup();
    const itemNumberAsString = itemNumber.toString();

    temp.displayOrder = 'Display Order'.length + itemNumber;
    temp.lookupType = 'fake Lookup Type' + itemNumberAsString;
    temp.lookupKey = 'fake Lookup Key' + itemNumberAsString;
    temp.lookupValue = 'fake Lookup Value' + itemNumberAsString;
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
