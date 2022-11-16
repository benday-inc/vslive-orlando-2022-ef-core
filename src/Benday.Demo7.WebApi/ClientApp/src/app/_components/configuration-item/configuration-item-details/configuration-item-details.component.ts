import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigurationItem } from '../../../_models/configuration-item';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConfigurationItemService } from '../../../_services/configuration-item.service';
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
  selector: 'app-configuration-item-details',
  templateUrl: './configuration-item-details.component.html',
  styleUrls: ['./configuration-item-details.component.css'],
})
export class ConfigurationItemDetailsComponent implements OnInit {
  public theModel: ConfigurationItem;
  public message: string = ApplicationConstants.emptyMessage;
  public theId: string = ApplicationConstants.emptyMessage;
  @ViewChild('configurationItemStatus', { static: true })
  private configurationItemStatus: LookupDropdownControlComponent | null = null;

  theForm = this.fb.group({
    configurationItemCategory: [
      '',
      [Validators.minLength(0), Validators.maxLength(50)],
    ],
    configurationItemConfigurationKey: [
      '',
      [Validators.minLength(0), Validators.maxLength(50)],
    ],
    configurationItemDescription: [
      '',
      [Validators.minLength(0), Validators.maxLength(512)],
    ],
    configurationItemConfigurationValue: ['', [Validators.minLength(0)]],
    configurationItemId: [''],
    configurationItemStatus: [''],
    configurationItemCreatedBy: [''],
    configurationItemCreatedDate: [''],
    configurationItemLastModifiedBy: [''],
    configurationItemLastModifiedDate: [''],
    configurationItemTimestamp: [''],
  });

  constructor(
    private configurationItemService: ConfigurationItemService,
    private routingHelper: RoutingHelperService,
    private fb: FormBuilder
  ) {
    this.theModel = new ConfigurationItem();
  }

  ngOnInit() {
    this.theId = this.routingHelper.getId();

    if (this.theId === '0') {
      this.initializeToBlank();
    } else {
      this.loadById(this.theId);
    }
  }

  public readonly fieldNameConfigurationItemCategory: string =
    'configurationItemCategory';
  public get category(): AbstractControl | null {
    return this.theForm.get(this.fieldNameConfigurationItemCategory);
  }
  public readonly fieldNameConfigurationItemConfigurationKey: string =
    'configurationItemConfigurationKey';
  public get configurationKey(): AbstractControl | null {
    return this.theForm.get(this.fieldNameConfigurationItemConfigurationKey);
  }
  public readonly fieldNameConfigurationItemDescription: string =
    'configurationItemDescription';
  public get description(): AbstractControl | null {
    return this.theForm.get(this.fieldNameConfigurationItemDescription);
  }
  public readonly fieldNameConfigurationItemConfigurationValue: string =
    'configurationItemConfigurationValue';
  public get configurationValue(): AbstractControl | null {
    return this.theForm.get(this.fieldNameConfigurationItemConfigurationValue);
  }
  public readonly fieldNameConfigurationItemId: string = 'configurationItemId';
  public get id(): AbstractControl | null {
    return this.theForm.get(this.fieldNameConfigurationItemId);
  }
  public readonly fieldNameConfigurationItemStatus: string =
    'configurationItemStatus';
  public get status(): AbstractControl | null {
    return this.theForm.get(this.fieldNameConfigurationItemStatus);
  }
  public readonly fieldNameConfigurationItemCreatedBy: string =
    'configurationItemCreatedBy';
  public get createdBy(): AbstractControl | null {
    return this.theForm.get(this.fieldNameConfigurationItemCreatedBy);
  }
  public readonly fieldNameConfigurationItemCreatedDate: string =
    'configurationItemCreatedDate';
  public get createdDate(): AbstractControl | null {
    return this.theForm.get(this.fieldNameConfigurationItemCreatedDate);
  }
  public readonly fieldNameConfigurationItemLastModifiedBy: string =
    'configurationItemLastModifiedBy';
  public get lastModifiedBy(): AbstractControl | null {
    return this.theForm.get(this.fieldNameConfigurationItemLastModifiedBy);
  }
  public readonly fieldNameConfigurationItemLastModifiedDate: string =
    'configurationItemLastModifiedDate';
  public get lastModifiedDate(): AbstractControl | null {
    return this.theForm.get(this.fieldNameConfigurationItemLastModifiedDate);
  }
  public readonly fieldNameConfigurationItemTimestamp: string =
    'configurationItemTimestamp';
  public get timestamp(): AbstractControl | null {
    return this.theForm.get(this.fieldNameConfigurationItemTimestamp);
  }

  afterLoad() {
    if (this.theModel !== null) {
      console.log('afterLoad() -- theModel is not null');

      /*
      if (!this.configurationItemStatus) {
    console.log('afterLoad() -- configurationItemStatus is null or undefined');
  } else {
    console.log('afterLoad() -- setting selected value on configurationItemStatus');
    this.configurationItemStatus.selectedValue = this.theModel.status;
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

      this.configurationItemService.save(this.theModel).subscribe(
        (data: ConfigurationItem) => {
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
      const msg = 'configuration item form is in an invalid state';
      this.message = msg;
      console.info(msg);
    }
  }

  beforeSave() {
    if (this.theModel !== null) {
      console.log('beforeSave() -- theModel is not null');
      this.populateModelFromForm();
      /*
      if (!this.configurationItemStatus) {
    console.log('beforeSave() -- configurationItemStatus is null or undefined');
  } else {
    console.log('beforeSave() -- setting selected value from configurationItemStatus');
    this.theModel.status = this.configurationItemStatus.selectedValue;
  }

      */
    } else {
      console.log('beforeSave() -- theModel is null');
    }
  }

  navigateToList() {
    // this.router.navigate(['/configuration-item/configuration-item-list']);
    this.routingHelper.navigateTo(
      '/configuration-item/configuration-item-list'
    );
  }

  cancel() {
    this.routingHelper.back();
  }

  delete() {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (this.theId !== '0') {
        this.configurationItemService.deleteById(Number(this.theId)).subscribe(
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
    const temp = new ConfigurationItem();
    this.theModel = temp;

    this.populateFormFromModel();
  }
  private populateModelFromForm() {
    const toValue = this.theModel;

    toValue.category = this.category!.value;
    toValue.configurationKey = this.configurationKey!.value;
    toValue.description = this.description!.value;
    toValue.configurationValue = this.configurationValue!.value;
    toValue.status = this.configurationItemStatus!.selectedValue;
    toValue.createdBy = this.createdBy!.value;
    toValue.createdDate = this.createdDate!.value;
    toValue.lastModifiedBy = this.lastModifiedBy!.value;
    toValue.lastModifiedDate = this.lastModifiedDate!.value;
    toValue.timestamp = this.timestamp!.value;
  }

  private populateFormFromModel() {
    const fromValue = this.theModel;

    this.category?.setValue(fromValue.category);
    this.configurationKey?.setValue(fromValue.configurationKey);
    this.description?.setValue(fromValue.description);
    this.configurationValue?.setValue(fromValue.configurationValue);
    this.id?.setValue(fromValue.id);
    this.status?.setValue(fromValue.status);
    this.createdBy?.setValue(fromValue.createdBy);
    this.createdDate?.setValue(fromValue.createdDate);
    this.lastModifiedBy?.setValue(fromValue.lastModifiedBy);
    this.lastModifiedDate?.setValue(fromValue.lastModifiedDate);
    this.timestamp?.setValue(fromValue.timestamp);
  }

  private loadById(id: string) {
    this.configurationItemService.getById(Number(id)).subscribe(
      (item: ConfigurationItem | null) => {
        if (item === null) {
          this.theModel = new ConfigurationItem();
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
