import { Lookup } from './lookup';
import { ApplicationConstants } from '../_common/application-constants';

describe('Lookup', () => {
  it('should create an instance', () => {
    expect(new Lookup()).toBeTruthy();
  });

  it('should populate default values', () => {
    const systemUnderTest = new Lookup();

    expect(systemUnderTest).toBeTruthy();

    expect(systemUnderTest.displayOrder).toBe(
      ApplicationConstants.defaultNumber
    );
    expect(systemUnderTest.lookupType).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.lookupKey).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.lookupValue).toBe(
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
