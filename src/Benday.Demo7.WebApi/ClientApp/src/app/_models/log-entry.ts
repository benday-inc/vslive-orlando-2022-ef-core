import { ModelBase } from './model-base';
import { ApplicationConstants } from '../_common/application-constants';

export class LogEntry extends ModelBase {
  id: number;
  category: string;
  logLevel: string;
  logText: string;
  exceptionText: string;
  eventId: string;
  state: string;
  logDate: Date;

  constructor() {
    super();

    this.id = ApplicationConstants.defaultNumber;
    this.category = ApplicationConstants.defaultString;
    this.logLevel = ApplicationConstants.defaultString;
    this.logText = ApplicationConstants.defaultString;
    this.exceptionText = ApplicationConstants.defaultString;
    this.eventId = ApplicationConstants.defaultString;
    this.state = ApplicationConstants.defaultString;
    this.logDate = ApplicationConstants.defaultDate;
  }
}
