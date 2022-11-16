import { ModelBase } from './model-base';
import { ApplicationConstants } from '../_common/application-constants';

export class Feedback extends ModelBase {
  feedbackType: string;
  sentiment: string;
  subject: string;
  feedbackText: string;
  username: string;
  firstName: string;
  lastName: string;
  referer: string;
  userAgent: string;
  ipAddress: string;
  isContactRequest: boolean;

  constructor() {
    super();

    this.feedbackType = ApplicationConstants.defaultString;
    this.sentiment = ApplicationConstants.defaultString;
    this.subject = ApplicationConstants.defaultString;
    this.feedbackText = ApplicationConstants.defaultString;
    this.username = ApplicationConstants.defaultString;
    this.firstName = ApplicationConstants.defaultString;
    this.lastName = ApplicationConstants.defaultString;
    this.referer = ApplicationConstants.defaultString;
    this.userAgent = ApplicationConstants.defaultString;
    this.ipAddress = ApplicationConstants.defaultString;
    this.isContactRequest = ApplicationConstants.defaultBoolean;
  }
}
