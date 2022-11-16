import { ConfigurationItem } from './configuration-item';
import { ApplicationConstants } from '../_common/application-constants';

describe('ConfigurationItem', () => {
  it('should create an instance', () => {
    expect(new ConfigurationItem()).toBeTruthy();
  });

  it('should populate default values', () => {
    const systemUnderTest = new ConfigurationItem();

    expect(systemUnderTest).toBeTruthy();

    expect(systemUnderTest.category).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.configurationKey).toBe(
      ApplicationConstants.defaultString
    );
    expect(systemUnderTest.description).toBe(
      ApplicationConstants.defaultString
    );
    expect(systemUnderTest.configurationValue).toBe(
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
