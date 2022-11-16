import { LogEntry } from './log-entry';

export class LogEntryTestUtilities {
  public static getFakeLogEntrys(numberOfFakeRecords: number): LogEntry[] {
    const returnValues: LogEntry[] = new Array<LogEntry>(numberOfFakeRecords);

    let temp: LogEntry;

    for (let index = 0; index < numberOfFakeRecords; index++) {
      temp = this.getFakeLogEntry(index);

      returnValues[index] = temp;
    }

    return returnValues;
  }

  public static getFakeLogEntry(itemNumber: number = 0): LogEntry {
    const temp = new LogEntry();
    const itemNumberAsString = itemNumber.toString();

    temp.id = 'Id'.length + itemNumber;
    temp.category = 'fake category' + itemNumberAsString;
    temp.logLevel = 'fake log level' + itemNumberAsString;
    temp.logText = 'fake log text' + itemNumberAsString;
    temp.exceptionText = 'fake exception text' + itemNumberAsString;
    temp.eventId = 'fake event id' + itemNumberAsString;
    temp.state = 'fake state' + itemNumberAsString;
    temp.logDate = new Date(new Date().getDate() + itemNumber);

    return temp;
  }
}
