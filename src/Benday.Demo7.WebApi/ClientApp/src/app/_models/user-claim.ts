import { ModelBase } from './model-base';
import { ApplicationConstants } from '../_common/application-constants';
import { User } from './user';

export class UserClaim extends ModelBase {
  username: string;
  claimName: string;
  claimValue: string;
  userId: number;
  user: User | null = null;
  claimLogicType: string;
  startDate: Date;
  endDate: Date;

  constructor() {
    super();

    this.username = ApplicationConstants.defaultString;
    this.claimName = ApplicationConstants.defaultString;
    this.claimValue = ApplicationConstants.defaultString;
    this.userId = ApplicationConstants.defaultNumber;
    this.claimLogicType = ApplicationConstants.defaultString;
    this.startDate = ApplicationConstants.defaultDate;
    this.endDate = ApplicationConstants.defaultDate;
  }
}
