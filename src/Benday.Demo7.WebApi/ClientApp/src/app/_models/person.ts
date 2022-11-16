import { ModelBase } from './model-base';
import { ApplicationConstants } from '../_common/application-constants';

export class Person extends ModelBase {
  firstName: string;
  lastName: string;
  emailAddress: string;

  constructor() {
    super();

    this.firstName = ApplicationConstants.defaultString;
    this.lastName = ApplicationConstants.defaultString;
    this.emailAddress = ApplicationConstants.defaultString;
  }
}
