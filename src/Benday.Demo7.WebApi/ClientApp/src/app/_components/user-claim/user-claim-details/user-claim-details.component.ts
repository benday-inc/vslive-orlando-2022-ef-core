import { Component, OnInit, ViewChild } from '@angular/core';
import { UserClaim } from '../../../_models/user-claim';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserClaimService } from '../../../_services/user-claim.service';
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
  selector: 'app-user-claim-details',
  templateUrl: './user-claim-details.component.html',
  styleUrls: ['./user-claim-details.component.css'],
})
export class UserClaimDetailsComponent implements OnInit {
  public theModel: UserClaim;
  public message: string = ApplicationConstants.emptyMessage;
  public theId: string = ApplicationConstants.emptyMessage;
  @ViewChild('userClaimClaimLogicType', { static: true })
  private userClaimClaimLogicType: LookupDropdownControlComponent | null = null;
  @ViewChild('userClaimStatus', { static: true })
  private userClaimStatus: LookupDropdownControlComponent | null = null;

  theForm = this.fb.group({
    userClaimUsername: [
      '',
      [Validators.minLength(0), Validators.maxLength(100)],
    ],
    userClaimClaimName: [
      '',
      [Validators.minLength(0), Validators.maxLength(100)],
    ],
    userClaimClaimValue: [
      '',
      [Validators.minLength(0), Validators.maxLength(100)],
    ],
    userClaimUserId: [''],
    userClaimUser: [''],
    userClaimClaimLogicType: [
      '',
      [Validators.minLength(0), Validators.maxLength(100)],
    ],
    userClaimStartDate: ['', Validators.required],
    userClaimEndDate: ['', Validators.required],
    userClaimId: [''],
    userClaimStatus: [''],
    userClaimCreatedBy: [''],
    userClaimCreatedDate: [''],
    userClaimLastModifiedBy: [''],
    userClaimLastModifiedDate: [''],
    userClaimTimestamp: [''],
  });

  constructor(
    private userClaimService: UserClaimService,
    private routingHelper: RoutingHelperService,
    private fb: FormBuilder
  ) {
    this.theModel = new UserClaim();
  }

  ngOnInit() {
    this.theId = this.routingHelper.getId();

    if (this.theId === '0') {
      this.initializeToBlank();
    } else {
      this.loadById(this.theId);
    }
  }

  public readonly fieldNameUserClaimUsername: string = 'userClaimUsername';
  public get username(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserClaimUsername);
  }
  public readonly fieldNameUserClaimClaimName: string = 'userClaimClaimName';
  public get claimName(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserClaimClaimName);
  }
  public readonly fieldNameUserClaimClaimValue: string = 'userClaimClaimValue';
  public get claimValue(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserClaimClaimValue);
  }
  public readonly fieldNameUserClaimUserId: string = 'userClaimUserId';
  public get userId(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserClaimUserId);
  }
  public readonly fieldNameUserClaimUser: string = 'userClaimUser';
  public get user(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserClaimUser);
  }
  public readonly fieldNameUserClaimClaimLogicType: string =
    'userClaimClaimLogicType';
  public get claimLogicType(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserClaimClaimLogicType);
  }
  public readonly fieldNameUserClaimStartDate: string = 'userClaimStartDate';
  public get startDate(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserClaimStartDate);
  }
  public readonly fieldNameUserClaimEndDate: string = 'userClaimEndDate';
  public get endDate(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserClaimEndDate);
  }
  public readonly fieldNameUserClaimId: string = 'userClaimId';
  public get id(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserClaimId);
  }
  public readonly fieldNameUserClaimStatus: string = 'userClaimStatus';
  public get status(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserClaimStatus);
  }
  public readonly fieldNameUserClaimCreatedBy: string = 'userClaimCreatedBy';
  public get createdBy(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserClaimCreatedBy);
  }
  public readonly fieldNameUserClaimCreatedDate: string =
    'userClaimCreatedDate';
  public get createdDate(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserClaimCreatedDate);
  }
  public readonly fieldNameUserClaimLastModifiedBy: string =
    'userClaimLastModifiedBy';
  public get lastModifiedBy(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserClaimLastModifiedBy);
  }
  public readonly fieldNameUserClaimLastModifiedDate: string =
    'userClaimLastModifiedDate';
  public get lastModifiedDate(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserClaimLastModifiedDate);
  }
  public readonly fieldNameUserClaimTimestamp: string = 'userClaimTimestamp';
  public get timestamp(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserClaimTimestamp);
  }

  afterLoad() {
    if (this.theModel !== null) {
      console.log('afterLoad() -- theModel is not null');

      /*
      if (!this.userClaimClaimLogicType) {
    console.log('afterLoad() -- userClaimClaimLogicType is null or undefined');
  } else {
    console.log('afterLoad() -- setting selected value on userClaimClaimLogicType');
    this.userClaimClaimLogicType.selectedValue = this.theModel.claimLogicType;
  }
if (!this.userClaimStatus) {
    console.log('afterLoad() -- userClaimStatus is null or undefined');
  } else {
    console.log('afterLoad() -- setting selected value on userClaimStatus');
    this.userClaimStatus.selectedValue = this.theModel.status;
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

      this.userClaimService.save(this.theModel).subscribe(
        (data: UserClaim) => {
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
      const msg = 'user claim form is in an invalid state';
      this.message = msg;
      console.info(msg);
    }
  }

  beforeSave() {
    if (this.theModel !== null) {
      console.log('beforeSave() -- theModel is not null');
      this.populateModelFromForm();
      /*
      if (!this.userClaimClaimLogicType) {
    console.log('beforeSave() -- userClaimClaimLogicType is null or undefined');
  } else {
    console.log('beforeSave() -- setting selected value from userClaimClaimLogicType');
    this.theModel.claimLogicType = this.userClaimClaimLogicType.selectedValue;
  }
if (!this.userClaimStatus) {
    console.log('beforeSave() -- userClaimStatus is null or undefined');
  } else {
    console.log('beforeSave() -- setting selected value from userClaimStatus');
    this.theModel.status = this.userClaimStatus.selectedValue;
  }

      */
    } else {
      console.log('beforeSave() -- theModel is null');
    }
  }

  navigateToList() {
    // this.router.navigate(['/user-claim/user-claim-list']);
    this.routingHelper.navigateTo('/user-claim/user-claim-list');
  }

  cancel() {
    this.routingHelper.back();
  }

  delete() {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (this.theId !== '0') {
        this.userClaimService.deleteById(Number(this.theId)).subscribe(
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
    const parentId = this.routingHelper.getValue('parentId');

    if (parentId === null) {
      this.message = 'Parent id for user is missing.';
    } else {
      const temp = new UserClaim();
      temp.userId = parseInt(parentId, 10);
      this.theModel = temp;

      this.populateFormFromModel();
    }
  }
  private populateModelFromForm() {
    const toValue = this.theModel;

    toValue.username = this.username!.value;
    toValue.claimName = this.claimName!.value;
    toValue.claimValue = this.claimValue!.value;
    toValue.claimLogicType = this.userClaimClaimLogicType!.selectedValue;
    toValue.startDate = this.startDate!.value;
    toValue.endDate = this.endDate!.value;
    toValue.status = this.userClaimStatus!.selectedValue;
    toValue.createdBy = this.createdBy!.value;
    toValue.createdDate = this.createdDate!.value;
    toValue.lastModifiedBy = this.lastModifiedBy!.value;
    toValue.lastModifiedDate = this.lastModifiedDate!.value;
    toValue.timestamp = this.timestamp!.value;
  }

  private populateFormFromModel() {
    const fromValue = this.theModel;

    this.username?.setValue(fromValue.username);
    this.claimName?.setValue(fromValue.claimName);
    this.claimValue?.setValue(fromValue.claimValue);
    this.userId?.setValue(fromValue.userId);
    this.claimLogicType?.setValue(fromValue.claimLogicType);
    this.startDate?.setValue(fromValue.startDate);
    this.endDate?.setValue(fromValue.endDate);
    this.id?.setValue(fromValue.id);
    this.status?.setValue(fromValue.status);
    this.createdBy?.setValue(fromValue.createdBy);
    this.createdDate?.setValue(fromValue.createdDate);
    this.lastModifiedBy?.setValue(fromValue.lastModifiedBy);
    this.lastModifiedDate?.setValue(fromValue.lastModifiedDate);
    this.timestamp?.setValue(fromValue.timestamp);
  }

  private loadById(id: string) {
    this.userClaimService.getById(Number(id)).subscribe(
      (item: UserClaim | null) => {
        if (item === null) {
          this.theModel = new UserClaim();
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
