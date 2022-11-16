import { Person } from './person';
import { ApplicationConstants } from '../_common/application-constants';

describe('Person', () => {
  it('should create an instance', () => {
    expect(new Person()).toBeTruthy();
  });

  it('should populate default values', () => {
    const systemUnderTest = new Person();

    expect(systemUnderTest).toBeTruthy();

    expect(systemUnderTest.firstName).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.lastName).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.emailAddress).toBe(
      ApplicationConstants.defaultString
    );
    expect(systemUnderTest.id).toBe(ApplicationConstants.defaultNumber);
    expect(systemUnderTest.status).toBe(ApplicationConstants.defaultStatus);
    expect(systemUnderTest.createdBy).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.createdDate).toBeDefined();
    expect(systemUnderTest.lastModifiedBy).toBe(
      ApplicationConstants.defaultString
    );
    expect(systemUnderTest.lastModifiedDate).toBeDefined();
    expect(systemUnderTest.timestamp).toBe(
      ApplicationConstants.defaultByteArray
    );
  });
});
