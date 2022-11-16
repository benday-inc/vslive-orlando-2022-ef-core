import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stringToBoolean' })
export class StringToBooleanPipe implements PipeTransform {
  transform(value: string): boolean {
    if (!value) {
      return false;
    } else if (value !== null) {
      const lowered = value.toLowerCase();

      if (lowered === 'true' || lowered === '1') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
