import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApplicationError } from '../_common/application-error';
import {
  ReactiveFormsModule,
  AbstractControl,
  FormGroup,
} from '@angular/forms';

export class TestUtilities {
  public static baseUrl = 'http://asdf/';

  public static assertFormControl(
    actualValueReturnedFromProperty: AbstractControl | null,
    actualValueReturnedFromTheForm: AbstractControl | null
  ) {
    expect(actualValueReturnedFromProperty).toBeDefined();
    expect(actualValueReturnedFromProperty).not.toBeNull();

    expect(actualValueReturnedFromTheForm).toBeDefined();
    expect(actualValueReturnedFromTheForm).not.toBeNull();

    expect(actualValueReturnedFromProperty).toBe(
      actualValueReturnedFromTheForm
    );
  }
}
