import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { RoutingHelperService } from '../../../_services/routing-helper.service';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { CommonUtilities } from 'src/app/_common/common-utilities';
import { ApplicationConstants } from 'src/app/_common/application-constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '../../../_models/person';
import { PersonService } from '../../../_services/person.service';
import { ApplicationError } from 'src/app/_common/application-error';

import { LookupDropdownControlComponent } from '../../lookup-dropdown-control/lookup-dropdown-control.component';

@Component({
  selector: 'app-person-details-dialog',
  templateUrl: './person-details-dialog.component.html',
  styleUrls: ['./person-details-dialog.component.css'],
})
export class PersonDetailsDialogComponent implements OnInit {
  public theModel: Person;
  public message: string = ApplicationConstants.emptyMessage;
  public theId: string = ApplicationConstants.emptyId;
  @ViewChild('personStatus', { static: true })
  private personStatus: LookupDropdownControlComponent | null = null;

  theForm = this.fb.group({
    personFirstName: ['', [Validators.minLength(0), Validators.maxLength(100)]],
    personLastName: ['', [Validators.minLength(0), Validators.maxLength(100)]],
    personEmailAddress: [
      '',
      [Validators.minLength(0), Validators.maxLength(100)],
    ],
    personId: [''],
    personStatus: [''],
    personCreatedBy: [''],
    personCreatedDate: [''],
    personLastModifiedBy: [''],
    personLastModifiedDate: [''],
    personTimestamp: [''],
  });

  constructor(
    private dialogRef: MatDialogRef<PersonDetailsDialogComponent>,
    private personService: PersonService,
    private routingHelper: RoutingHelperService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: Person
  ) {
    this.theModel = data;
    this.theId = this.theModel.id.toString();
    this.afterLoad();
  }

  ngOnInit() {
    this.afterLoad();
  }

  public readonly fieldNamePersonFirstName: string = 'personFirstName';
  public get firstName(): AbstractControl | null {
    return this.theForm.get(this.fieldNamePersonFirstName);
  }
  public readonly fieldNamePersonLastName: string = 'personLastName';
  public get lastName(): AbstractControl | null {
    return this.theForm.get(this.fieldNamePersonLastName);
  }
  public readonly fieldNamePersonEmailAddress: string = 'personEmailAddress';
  public get emailAddress(): AbstractControl | null {
    return this.theForm.get(this.fieldNamePersonEmailAddress);
  }
  public readonly fieldNamePersonId: string = 'personId';
  public get id(): AbstractControl | null {
    return this.theForm.get(this.fieldNamePersonId);
  }
  public readonly fieldNamePersonStatus: string = 'personStatus';
  public get status(): AbstractControl | null {
    return this.theForm.get(this.fieldNamePersonStatus);
  }
  public readonly fieldNamePersonCreatedBy: string = 'personCreatedBy';
  public get createdBy(): AbstractControl | null {
    return this.theForm.get(this.fieldNamePersonCreatedBy);
  }
  public readonly fieldNamePersonCreatedDate: string = 'personCreatedDate';
  public get createdDate(): AbstractControl | null {
    return this.theForm.get(this.fieldNamePersonCreatedDate);
  }
  public readonly fieldNamePersonLastModifiedBy: string =
    'personLastModifiedBy';
  public get lastModifiedBy(): AbstractControl | null {
    return this.theForm.get(this.fieldNamePersonLastModifiedBy);
  }
  public readonly fieldNamePersonLastModifiedDate: string =
    'personLastModifiedDate';
  public get lastModifiedDate(): AbstractControl | null {
    return this.theForm.get(this.fieldNamePersonLastModifiedDate);
  }
  public readonly fieldNamePersonTimestamp: string = 'personTimestamp';
  public get timestamp(): AbstractControl | null {
    return this.theForm.get(this.fieldNamePersonTimestamp);
  }

  private initializeToBlank() {
    const temp = new Person();
    this.theModel = temp;

    this.populateFormFromModel();
  }

  private populateModelFromForm() {
    const toValue = this.theModel;

    toValue.firstName = this.firstName!.value;
    toValue.lastName = this.lastName!.value;
    toValue.emailAddress = this.emailAddress!.value;
    toValue.status = this.personStatus!.selectedValue;
    toValue.createdBy = this.createdBy!.value;
    toValue.createdDate = this.createdDate!.value;
    toValue.lastModifiedBy = this.lastModifiedBy!.value;
    toValue.lastModifiedDate = this.lastModifiedDate!.value;
    toValue.timestamp = this.timestamp!.value;
  }

  private populateFormFromModel() {
    const fromValue = this.theModel;

    this.firstName?.setValue(fromValue.firstName);
    this.lastName?.setValue(fromValue.lastName);
    this.emailAddress?.setValue(fromValue.emailAddress);
    this.id?.setValue(fromValue.id);
    this.status?.setValue(fromValue.status);
    this.createdBy?.setValue(fromValue.createdBy);
    this.createdDate?.setValue(fromValue.createdDate);
    this.lastModifiedBy?.setValue(fromValue.lastModifiedBy);
    this.lastModifiedDate?.setValue(fromValue.lastModifiedDate);
    this.timestamp?.setValue(fromValue.timestamp);
  }

  private loadById(id: string) {
    this.personService.getById(Number(id)).subscribe(
      (item: Person | null) => {
        if (item === null) {
          this.theModel = new Person();
          this.message = ApplicationConstants.noDataMessage;
        } else {
          this.theModel = item;
          this.afterLoad();
        }
      },
      (error: any) => {
        this.message = CommonUtilities.formatErrorMessageFromAny(error);
      }
    );
  }

  afterLoad() {
    if (this.theModel !== null) {
      console.log('afterLoad() -- theModel is not null');

      this.populateFormFromModel();
    } else {
      console.log('afterLoad() -- theModel is null');
    }
  }

  save() {
    this.message = ApplicationConstants.emptyMessage;
    if (this.theForm.valid) {
      this.beforeSave();
      if (this.theId !== '0') {
        this.personService.save(this.theModel).subscribe(
          (data: any) => {
            this.message = data.msg;
            this.loadById(this.theId);
          },
          (error: ApplicationError) => {
            this.message = CommonUtilities.formatErrorMessage(error);
          }
        );
      } else {
        this.personService.save(this.theModel).subscribe(
          (data: Person) => {
            this.theModel = data;
            this.theId = data.id.toString();
          },
          (error: ApplicationError) => {
            this.message = CommonUtilities.formatErrorMessage(error);
          }
        );
      }
    } else {
      const msg = 'Person form is in an invalid state';
      this.message = msg;
      console.info(msg);
    }
  }

  beforeSave() {
    if (this.theModel !== null) {
      console.log('beforeSave() -- theModel is not null');
      this.populateModelFromForm();
    } else {
      console.log('beforeSave() -- theModel is null');
    }
  }

  cancel() {
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (this.theId !== '0') {
        this.personService.deleteById(Number(this.theId)).subscribe(
          (result) => {
            this.close();
          },
          (error) => {
            this.message = CommonUtilities.formatErrorMessage(error);
          }
        );
      } else {
        this.close();
      }
    }
  }
}
