import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../_models/user';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from '../../../_services/user.service';
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
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  public theModel: User;
  public message: string = ApplicationConstants.emptyMessage;
  public theId: string = ApplicationConstants.emptyMessage;
  @ViewChild('userStatus', { static: true })
  private userStatus: LookupDropdownControlComponent | null = null;

  theForm = this.fb.group({
    userUsername: ['', [Validators.minLength(0), Validators.maxLength(100)]],
    userSource: ['', [Validators.minLength(0), Validators.maxLength(100)]],
    userEmailAddress: [
      '',
      [Validators.minLength(0), Validators.maxLength(100)],
    ],
    userFirstName: ['', [Validators.minLength(0), Validators.maxLength(50)]],
    userLastName: ['', [Validators.minLength(0), Validators.maxLength(50)]],
    userPhoneNumber: ['', [Validators.minLength(0), Validators.maxLength(50)]],
    userClaims: [''],
    userId: [''],
    userStatus: [''],
    userCreatedBy: [''],
    userCreatedDate: [''],
    userLastModifiedBy: [''],
    userLastModifiedDate: [''],
    userTimestamp: [''],
  });

  constructor(
    private userService: UserService,
    private routingHelper: RoutingHelperService,
    private fb: FormBuilder
  ) {
    this.theModel = new User();
  }

  ngOnInit() {
    this.theId = this.routingHelper.getId();

    if (this.theId === '0') {
      this.initializeToBlank();
    } else {
      this.loadById(this.theId);
    }
  }

  public readonly fieldNameUserUsername: string = 'userUsername';
  public get username(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserUsername);
  }
  public readonly fieldNameUserSource: string = 'userSource';
  public get source(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserSource);
  }
  public readonly fieldNameUserEmailAddress: string = 'userEmailAddress';
  public get emailAddress(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserEmailAddress);
  }
  public readonly fieldNameUserFirstName: string = 'userFirstName';
  public get firstName(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserFirstName);
  }
  public readonly fieldNameUserLastName: string = 'userLastName';
  public get lastName(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserLastName);
  }
  public readonly fieldNameUserPhoneNumber: string = 'userPhoneNumber';
  public get phoneNumber(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserPhoneNumber);
  }
  public readonly fieldNameUserClaims: string = 'userClaims';
  public get claims(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserClaims);
  }
  public readonly fieldNameUserId: string = 'userId';
  public get id(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserId);
  }
  public readonly fieldNameUserStatus: string = 'userStatus';
  public get status(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserStatus);
  }
  public readonly fieldNameUserCreatedBy: string = 'userCreatedBy';
  public get createdBy(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserCreatedBy);
  }
  public readonly fieldNameUserCreatedDate: string = 'userCreatedDate';
  public get createdDate(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserCreatedDate);
  }
  public readonly fieldNameUserLastModifiedBy: string = 'userLastModifiedBy';
  public get lastModifiedBy(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserLastModifiedBy);
  }
  public readonly fieldNameUserLastModifiedDate: string =
    'userLastModifiedDate';
  public get lastModifiedDate(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserLastModifiedDate);
  }
  public readonly fieldNameUserTimestamp: string = 'userTimestamp';
  public get timestamp(): AbstractControl | null {
    return this.theForm.get(this.fieldNameUserTimestamp);
  }

  afterLoad() {
    if (this.theModel !== null) {
      console.log('afterLoad() -- theModel is not null');

      /*
      if (!this.userStatus) {
    console.log('afterLoad() -- userStatus is null or undefined');
  } else {
    console.log('afterLoad() -- setting selected value on userStatus');
    this.userStatus.selectedValue = this.theModel.status;
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

      this.userService.save(this.theModel).subscribe(
        (data: User) => {
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
      const msg = 'user form is in an invalid state';
      this.message = msg;
      console.info(msg);
    }
  }

  beforeSave() {
    if (this.theModel !== null) {
      console.log('beforeSave() -- theModel is not null');
      this.populateModelFromForm();
      /*
      if (!this.userStatus) {
    console.log('beforeSave() -- userStatus is null or undefined');
  } else {
    console.log('beforeSave() -- setting selected value from userStatus');
    this.theModel.status = this.userStatus.selectedValue;
  }

      */
    } else {
      console.log('beforeSave() -- theModel is null');
    }
  }

  navigateToList() {
    // this.router.navigate(['/user/user-list']);
    this.routingHelper.navigateTo('/user/user-list');
  }

  cancel() {
    this.routingHelper.back();
  }

  delete() {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (this.theId !== '0') {
        this.userService.deleteById(Number(this.theId)).subscribe(
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
    const temp = new User();
    this.theModel = temp;

    this.populateFormFromModel();
  }
  private populateModelFromForm() {
    const toValue = this.theModel;

    toValue.username = this.username!.value;
    toValue.source = this.source!.value;
    toValue.emailAddress = this.emailAddress!.value;
    toValue.firstName = this.firstName!.value;
    toValue.lastName = this.lastName!.value;
    toValue.phoneNumber = this.phoneNumber!.value;
    toValue.status = this.userStatus!.selectedValue;
    toValue.createdBy = this.createdBy!.value;
    toValue.createdDate = this.createdDate!.value;
    toValue.lastModifiedBy = this.lastModifiedBy!.value;
    toValue.lastModifiedDate = this.lastModifiedDate!.value;
    toValue.timestamp = this.timestamp!.value;
  }

  private populateFormFromModel() {
    const fromValue = this.theModel;

    this.username?.setValue(fromValue.username);
    this.source?.setValue(fromValue.source);
    this.emailAddress?.setValue(fromValue.emailAddress);
    this.firstName?.setValue(fromValue.firstName);
    this.lastName?.setValue(fromValue.lastName);
    this.phoneNumber?.setValue(fromValue.phoneNumber);
    this.id?.setValue(fromValue.id);
    this.status?.setValue(fromValue.status);
    this.createdBy?.setValue(fromValue.createdBy);
    this.createdDate?.setValue(fromValue.createdDate);
    this.lastModifiedBy?.setValue(fromValue.lastModifiedBy);
    this.lastModifiedDate?.setValue(fromValue.lastModifiedDate);
    this.timestamp?.setValue(fromValue.timestamp);
  }

  private loadById(id: string) {
    this.userService.getById(Number(id)).subscribe(
      (item: User | null) => {
        if (item === null) {
          this.theModel = new User();
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
