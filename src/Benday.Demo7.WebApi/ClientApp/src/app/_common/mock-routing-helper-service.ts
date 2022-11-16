import { RoutingHelperService } from '../_services/routing-helper.service';

export class MockRoutingHelperService extends RoutingHelperService {
  public getIdReturnValue: string;
  public getValueReturnValue: string;

  constructor() {
    super(null, null, null);
    this.getIdReturnValue = '0';
    this.getValueReturnValue = '';
  }

  getId(): string {
    return this.getIdReturnValue;
  }

  getValue(key: string): string {
    return this.getValueReturnValue;
  }
}
