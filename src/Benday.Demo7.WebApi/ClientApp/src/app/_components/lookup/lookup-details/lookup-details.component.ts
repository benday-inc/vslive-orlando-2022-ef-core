import { Component, OnInit, ViewChild } from '@angular/core';
import { Lookup } from '../../../_models/lookup';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LookupService } from '../../../_services/lookup.service';
import { Observable, throwError } from 'rxjs';
import { RoutingHelperService } from '../../../_services/routing-helper.service';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { ApplicationError } from 'src/app/_common/application-error';
import { CommonUtilities } from 'src/app/_common/common-utilities';
import { ApplicationConstants } from 'src/app/_common/application-constants';

import { LookupDropdownControlComponent } from '../../lookup-dropdown-control/lookup-dropdown-control.component';

@Component({
  selector: 'app-lookup-details',
  templateUrl: './lookup-details.component.html',
  styleUrls: ['./lookup-details.component.css'],
})
export class LookupDetailsComponent implements OnInit {
  public theModel: Lookup;
  public message: string = ApplicationConstants.emptyMessage;
  public theId: string = ApplicationConstants.emptyMessage;
  @ViewChild('lookupLookupType', { static: true })
  private lookupLookupType: LookupDropdownControlComponent | null = null;
  @ViewChild('lookupStatus', { static: true })
  private lookupStatus: LookupDropdownControlComponent | null = null;

  theForm = this.fb.group({
    lookupDisplayOrder: ['', Validators.required],
    lookupLookupType: ['', [Validators.minLength(0), Validators.maxLength(50)]],
    lookupLookupKey: ['', [Validators.minLength(0), Validators.maxLength(50)]],
    lookupLookupValue: [
      '',
      [Validators.minLength(0), Validators.maxLength(50)],
    ],
    lookupId: [''],
    lookupStatus: [''],
    lookupCreatedBy: [''],
    lookupCreatedDate: [''],
    lookupLastModifiedBy: [''],
    lookupLastModifiedDate: [''],
    lookupTimestamp: [''],
  });

  constructor(
    private lookupService: LookupService,
    private routingHelper: RoutingHelperService,
    private fb: FormBuilder
  ) {
    this.theModel = new Lookup();
  }

  ngOnInit() {
    this.theId = this.routingHelper.getId();

    if (this.theId === '0') {
      this.initializeToBlank();
    } else {
      this.loadById(this.theId);
    }
  }

  public readonly fieldNameLookupDisplayOrder: string = 'lookupDisplayOrder';
  public get displayOrder(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLookupDisplayOrder);
  }
  public readonly fieldNameLookupLookupType: string = 'lookupLookupType';
  public get lookupType(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLookupLookupType);
  }
  public readonly fieldNameLookupLookupKey: string = 'lookupLookupKey';
  public get lookupKey(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLookupLookupKey);
  }
  public readonly fieldNameLookupLookupValue: string = 'lookupLookupValue';
  public get lookupValue(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLookupLookupValue);
  }
  public readonly fieldNameLookupId: string = 'lookupId';
  public get id(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLookupId);
  }
  public readonly fieldNameLookupStatus: string = 'lookupStatus';
  public get status(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLookupStatus);
  }
  public readonly fieldNameLookupCreatedBy: string = 'lookupCreatedBy';
  public get createdBy(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLookupCreatedBy);
  }
  public readonly fieldNameLookupCreatedDate: string = 'lookupCreatedDate';
  public get createdDate(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLookupCreatedDate);
  }
  public readonly fieldNameLookupLastModifiedBy: string =
    'lookupLastModifiedBy';
  public get lastModifiedBy(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLookupLastModifiedBy);
  }
  public readonly fieldNameLookupLastModifiedDate: string =
    'lookupLastModifiedDate';
  public get lastModifiedDate(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLookupLastModifiedDate);
  }
  public readonly fieldNameLookupTimestamp: string = 'lookupTimestamp';
  public get timestamp(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLookupTimestamp);
  }

  afterLoad() {
    if (this.theModel !== null) {
      console.log('afterLoad() -- theModel is not null');

      /*
      if (!this.lookupLookupType) {
    console.log('afterLoad() -- lookupLookupType is null or undefined');
  } else {
    console.log('afterLoad() -- setting selected value on lookupLookupType');
    this.lookupLookupType.selectedValue = this.theModel.lookupType;
  }
if (!this.lookupStatus) {
    console.log('afterLoad() -- lookupStatus is null or undefined');
  } else {
    console.log('afterLoad() -- setting selected value on lookupStatus');
    this.lookupStatus.selectedValue = this.theModel.status;
  }

      */

      this.populateFormFromModel();
    } else {
      console.log('afterLoad() -- theModel is null');
    }
  }

  save() {
    this.message = ApplicationConstants.emptyMessage;
    if (this.theForm.valid) {
      this.beforeSave();

      this.lookupService.save(this.theModel).subscribe(
        (data: Lookup) => {
          this.message = ApplicationConstants.savedMessage;
          this.theModel = data;
          this.theId = data.id.toString();
          this.afterLoad();
        },
        (error: ApplicationError) => {
          this.message = CommonUtilities.formatErrorMessage(error);
        }
      );
    } else {
      const msg = 'lookup form is in an invalid state';
      this.message = msg;
      console.info(msg);
    }
  }

  beforeSave() {
    if (this.theModel !== null) {
      console.log('beforeSave() -- theModel is not null');
      this.populateModelFromForm();
      /*
      if (!this.lookupLookupType) {
    console.log('beforeSave() -- lookupLookupType is null or undefined');
  } else {
    console.log('beforeSave() -- setting selected value from lookupLookupType');
    this.theModel.lookupType = this.lookupLookupType.selectedValue;
  }
if (!this.lookupStatus) {
    console.log('beforeSave() -- lookupStatus is null or undefined');
  } else {
    console.log('beforeSave() -- setting selected value from lookupStatus');
    this.theModel.status = this.lookupStatus.selectedValue;
  }

      */
    } else {
      console.log('beforeSave() -- theModel is null');
    }
  }

  navigateToList() {
    // this.router.navigate(['/lookup/lookup-list']);
    this.routingHelper.navigateTo('/lookup/lookup-list');
  }

  cancel() {
    this.routingHelper.back();
  }

  delete() {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (this.theId !== '0') {
        this.lookupService.deleteById(Number(this.theId)).subscribe(
          (result) => {
            this.navigateToList();
          },
          (error) => {
            this.message = CommonUtilities.formatErrorMessage(error);
          }
        );
      } else {
        this.navigateToList();
      }
    }
  }

  private initializeToBlank() {
    const temp = new Lookup();
    this.theModel = temp;

    this.populateFormFromModel();
  }
  private populateModelFromForm() {
    const toValue = this.theModel;

    toValue.displayOrder = parseInt(this.displayOrder?.value);
    toValue.lookupType = this.lookupLookupType!.selectedValue;
    toValue.lookupKey = this.lookupKey!.value;
    toValue.lookupValue = this.lookupValue!.value;
    toValue.status = this.lookupStatus!.selectedValue;
    toValue.createdBy = this.createdBy!.value;
    toValue.createdDate = this.createdDate!.value;
    toValue.lastModifiedBy = this.lastModifiedBy!.value;
    toValue.lastModifiedDate = this.lastModifiedDate!.value;
    toValue.timestamp = this.timestamp!.value;
  }

  private populateFormFromModel() {
    const fromValue = this.theModel;

    this.displayOrder?.setValue(fromValue.displayOrder);
    this.lookupType?.setValue(fromValue.lookupType);
    this.lookupKey?.setValue(fromValue.lookupKey);
    this.lookupValue?.setValue(fromValue.lookupValue);
    this.id?.setValue(fromValue.id);
    this.status?.setValue(fromValue.status);
    this.createdBy?.setValue(fromValue.createdBy);
    this.createdDate?.setValue(fromValue.createdDate);
    this.lastModifiedBy?.setValue(fromValue.lastModifiedBy);
    this.lastModifiedDate?.setValue(fromValue.lastModifiedDate);
    this.timestamp?.setValue(fromValue.timestamp);
  }

  private loadById(id: string) {
    this.lookupService.getById(Number(id)).subscribe(
      (item: Lookup | null) => {
        if (item === null) {
          this.theModel = new Lookup();
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
}
