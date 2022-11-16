import { ModelBase } from './model-base';
import { ApplicationConstants } from '../_common/application-constants';

describe('ModelBase', () => {
  it('should create an instance', () => {
    expect(new ModelBase()).toBeTruthy();
  });

  it('should populate default values', () => {
    const sut = new ModelBase();

    expect(sut).toBeTruthy();

    expect(sut.id).toBe(ApplicationConstants.defaultId);
    expect(sut.status).toBe(ApplicationConstants.defaultStatus);
    expect(sut.createdBy).toBe(ApplicationConstants.defaultString);
    expect(sut.createdDate).toBeDefined(ApplicationConstants.defaultDate);
    expect(sut.lastModifiedBy).toBe(ApplicationConstants.defaultString);
    expect(sut.lastModifiedDate).toBeDefined(ApplicationConstants.defaultDate);
  });
});
