import { LogEntry } from './log-entry';
import { ApplicationConstants } from '../_common/application-constants';

describe('LogEntry', () => {
  it('should create an instance', () => {
    expect(new LogEntry()).toBeTruthy();
  });

  it('should populate default values', () => {
    const systemUnderTest = new LogEntry();

    expect(systemUnderTest).toBeTruthy();

    expect(systemUnderTest.id).toBe(ApplicationConstants.defaultNumber);
    expect(systemUnderTest.category).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.logLevel).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.logText).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.exceptionText).toBe(
      ApplicationConstants.defaultString
    );
    expect(systemUnderTest.eventId).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.state).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.logDate).toBeDefined();
  });
});
