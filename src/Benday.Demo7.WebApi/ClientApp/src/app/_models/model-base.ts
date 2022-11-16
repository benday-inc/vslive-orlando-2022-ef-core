import { ApplicationConstants } from '../_common/application-constants';

export class ModelBase {
  id: number;
  status: string;
  createdBy: string;
  createdDate: Date;
  lastModifiedBy: string;
  lastModifiedDate: Date;
  timestamp: string;

  constructor() {
    this.id = ApplicationConstants.defaultId;
    this.status = ApplicationConstants.defaultStatus;
    this.createdBy = ApplicationConstants.defaultString;
    this.lastModifiedBy = ApplicationConstants.defaultString;
    this.createdDate = ApplicationConstants.defaultDate;
    this.lastModifiedDate = ApplicationConstants.defaultDate;
    this.timestamp = ApplicationConstants.defaultByteArray;
  }
}
