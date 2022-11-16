import { ModelBase } from './model-base';
import { ApplicationConstants } from '../_common/application-constants';

export class Lookup extends ModelBase {
  displayOrder: number;
  lookupType: string;
  lookupKey: string;
  lookupValue: string;

  constructor() {
    super();

    this.displayOrder = ApplicationConstants.defaultNumber;
    this.lookupType = ApplicationConstants.defaultString;
    this.lookupKey = ApplicationConstants.defaultString;
    this.lookupValue = ApplicationConstants.defaultString;
  }
}
