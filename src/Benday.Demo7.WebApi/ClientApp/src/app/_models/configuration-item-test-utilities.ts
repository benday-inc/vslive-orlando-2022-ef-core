import { ConfigurationItem } from './configuration-item';

export class ConfigurationItemTestUtilities {
  public static getFakeConfigurationItems(
    numberOfFakeRecords: number
  ): ConfigurationItem[] {
    const returnValues: ConfigurationItem[] = new Array<ConfigurationItem>(
      numberOfFakeRecords
    );

    let temp: ConfigurationItem;

    for (let index = 0; index < numberOfFakeRecords; index++) {
      temp = this.getFakeConfigurationItem(index);

      returnValues[index] = temp;
    }

    return returnValues;
  }

  public static getFakeConfigurationItem(
    itemNumber: number = 0
  ): ConfigurationItem {
    const temp = new ConfigurationItem();
    const itemNumberAsString = itemNumber.toString();

    temp.category = 'fake category' + itemNumberAsString;
    temp.configurationKey = 'fake configuration key' + itemNumberAsString;
    temp.description = 'fake description' + itemNumberAsString;
    temp.configurationValue = 'fake configuration value' + itemNumberAsString;
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
