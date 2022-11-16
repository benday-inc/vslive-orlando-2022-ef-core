import { ModelBase } from './model-base';
import { ApplicationConstants } from '../_common/application-constants';
import { UserClaim } from './user-claim';

export class User extends ModelBase {
  username: string;
  source: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  claims: UserClaim[];

  constructor() {
    super();

    this.username = ApplicationConstants.defaultString;
    this.source = ApplicationConstants.defaultString;
    this.emailAddress = ApplicationConstants.defaultString;
    this.firstName = ApplicationConstants.defaultString;
    this.lastName = ApplicationConstants.defaultString;
    this.phoneNumber = ApplicationConstants.defaultString;
    this.claims = [];
  }
}
