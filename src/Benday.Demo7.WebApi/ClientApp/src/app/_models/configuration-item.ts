import { ModelBase } from './model-base';
import { ApplicationConstants } from '../_common/application-constants';

export class ConfigurationItem extends ModelBase {
  category: string;
  configurationKey: string;
  description: string;
  configurationValue: string;

  constructor() {
    super();

    this.category = ApplicationConstants.defaultString;
    this.configurationKey = ApplicationConstants.defaultString;
    this.description = ApplicationConstants.defaultString;
    this.configurationValue = ApplicationConstants.defaultString;
  }
}
