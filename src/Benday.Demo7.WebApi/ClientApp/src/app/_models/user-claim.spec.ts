import { UserClaim } from './user-claim';
import { ApplicationConstants } from '../_common/application-constants';

describe('UserClaim', () => {
  it('should create an instance', () => {
    expect(new UserClaim()).toBeTruthy();
  });

  it('should populate default values', () => {
    const systemUnderTest = new UserClaim();

    expect(systemUnderTest).toBeTruthy();

    expect(systemUnderTest.username).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.claimName).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.claimValue).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.userId).toBe(ApplicationConstants.defaultNumber);
    expect(systemUnderTest.claimLogicType).toBe(
      ApplicationConstants.defaultString
    );
    expect(systemUnderTest.startDate).toBeDefined();
    expect(systemUnderTest.endDate).toBeDefined();
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
