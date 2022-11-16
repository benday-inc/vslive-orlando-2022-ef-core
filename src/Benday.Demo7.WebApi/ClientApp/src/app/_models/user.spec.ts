import { User } from './user';
import { ApplicationConstants } from '../_common/application-constants';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });

  it('should populate default values', () => {
    const systemUnderTest = new User();

    expect(systemUnderTest).toBeTruthy();

    expect(systemUnderTest.username).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.source).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.emailAddress).toBe(
      ApplicationConstants.defaultString
    );
    expect(systemUnderTest.firstName).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.lastName).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.phoneNumber).toBe(
      ApplicationConstants.defaultString
    );
    expect(systemUnderTest.claims).toBeDefined();
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
