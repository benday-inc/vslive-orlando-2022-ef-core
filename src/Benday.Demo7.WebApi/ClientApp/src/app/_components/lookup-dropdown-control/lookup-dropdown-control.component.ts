import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  forwardRef,
} from '@angular/core';
import { Lookup } from 'src/app/_models/lookup';
import { ApplicationError } from 'src/app/_common/application-error';
import { LookupService } from 'src/app/_services/lookup.service';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  NgForm,
  FormControl,
  FormBuilder,
  Validators,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
  SelectControlValueAccessor,
  FormGroup,
} from '@angular/forms';
import { ApplicationConstants } from 'src/app/_common/application-constants';

@Component({
  selector: 'app-lookup-dropdown-control',
  templateUrl: './lookup-dropdown-control.component.html',
  styleUrls: ['./lookup-dropdown-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LookupDropdownControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LookupDropdownControlComponent),
      multi: true,
    },
  ],
})
export class LookupDropdownControlComponent
  implements OnInit, ControlValueAccessor, Validator
{
  public availableValues: Lookup[];
  @Input() labelText: string;
  @Input() lookupTypeName: string;
  @Input() autoPopulateLookups: boolean;
  @Input() isVisible: boolean;
  @Input() isDisabled: boolean;
  @Input() isRequired: boolean;
  public message: string = ApplicationConstants.emptyMessage;
  public theForm: FormGroup = new FormGroup({
    control: new FormControl('', [Validators.required]),
  });

  constructor(private lookupService: LookupService) {
    this.autoPopulateLookups = true;
    this.availableValues = [];
    this.labelText = '';
    this.lookupTypeName = '';
    this.isVisible = true;
    this.isDisabled = false;
    this.isRequired = false;
  }

  public get selectedValue(): string {
    return this.selectControl.value;
  }

  public set selectedValue(value: string) {
    this.selectControl.setValue(value.toLowerCase(), { emitEvent: false });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.theForm.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'theForm fields on child are invalid',
          },
        };
  }
  registerOnValidatorChange?(fn: () => void): void {}

  writeValue(value: any): void {
    this.theForm.get('control')?.setValue(value.toLowerCase());
  }

  registerOnChange(fn: any): void {
    this.theForm.valueChanges.subscribe(fn);
  }

  public onTouched: () => void = () => {
    console.log('child123.onTouched got called');
  };

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.theForm.disable() : this.theForm.enable();
  }

  ngOnInit() {
    if (this.autoPopulateLookups === true) {
      this.populateAvailableLookups();
    }
  }

  public readonly fieldNameSelectControl: string = 'control';
  public get selectControl(): FormControl {
    return this.theForm.get(this.fieldNameSelectControl) as FormControl;
  }

  public populateAvailableLookups() {
    if (this.lookupTypeName === '') {
      console.debug('Lookup type name is not set...');
    } else {
      this.lookupService.getByType(this.lookupTypeName).subscribe(
        (results: Lookup[]) => {
          this.availableValues = results;
          if (results === null) {
            this.availableValues = [];
          }
        },
        (error: ApplicationError) => {
          this.message = error.friendlyMessage;
        }
      );
    }
  }

  public getItemCount(): number {
    if (!this.availableValues) {
      return 0;
    } else {
      return this.availableValues.length;
    }
  }

  public addAvailableValue(value: string) {
    const temp = new Lookup();

    temp.lookupKey = value;
    temp.lookupValue = value;

    this.availableValues.push(temp);
  }

  public isValid(): boolean {
    if (!this.selectControl) {
      console.warn('isValid(): selectControl is null or undefined');
      return false;
    } else {
      const returnValue = this.selectControl.valid;

      console.debug(`isValid(): selectControl.isValid is ${returnValue}`);

      return returnValue;
    }
  }
}
