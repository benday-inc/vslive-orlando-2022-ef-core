import { Feedback } from './feedback';
import { ApplicationConstants } from '../_common/application-constants';

describe('Feedback', () => {
  it('should create an instance', () => {
    expect(new Feedback()).toBeTruthy();
  });

  it('should populate default values', () => {
    const systemUnderTest = new Feedback();

    expect(systemUnderTest).toBeTruthy();

    expect(systemUnderTest.feedbackType).toBe(
      ApplicationConstants.defaultString
    );
    expect(systemUnderTest.sentiment).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.subject).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.feedbackText).toBe(
      ApplicationConstants.defaultString
    );
    expect(systemUnderTest.username).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.firstName).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.lastName).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.referer).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.userAgent).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.ipAddress).toBe(ApplicationConstants.defaultString);
    expect(systemUnderTest.isContactRequest).toBe(
      ApplicationConstants.defaultBoolean
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
