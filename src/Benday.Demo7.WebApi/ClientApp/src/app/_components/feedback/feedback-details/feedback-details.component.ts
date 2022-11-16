import { Component, OnInit, ViewChild } from '@angular/core';
import { Feedback } from '../../../_models/feedback';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FeedbackService } from '../../../_services/feedback.service';
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
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.component.html',
  styleUrls: ['./feedback-details.component.css'],
})
export class FeedbackDetailsComponent implements OnInit {
  public theModel: Feedback;
  public message: string = ApplicationConstants.emptyMessage;
  public theId: string = ApplicationConstants.emptyMessage;
  @ViewChild('feedbackFeedbackType', { static: true })
  private feedbackFeedbackType: LookupDropdownControlComponent | null = null;
  @ViewChild('feedbackSentiment', { static: true })
  private feedbackSentiment: LookupDropdownControlComponent | null = null;
  @ViewChild('feedbackStatus', { static: true })
  private feedbackStatus: LookupDropdownControlComponent | null = null;

  theForm = this.fb.group({
    feedbackFeedbackType: [
      '',
      [Validators.minLength(0), Validators.maxLength(50)],
    ],
    feedbackSentiment: [
      '',
      [Validators.minLength(0), Validators.maxLength(50)],
    ],
    feedbackSubject: [
      '',
      [Validators.minLength(0), Validators.maxLength(1024)],
    ],
    feedbackFeedbackText: [
      '',
      [Validators.minLength(0), Validators.maxLength(2048)],
    ],
    feedbackUsername: ['', [Validators.minLength(0), Validators.maxLength(50)]],
    feedbackFirstName: [
      '',
      [Validators.minLength(0), Validators.maxLength(50)],
    ],
    feedbackLastName: ['', [Validators.minLength(0), Validators.maxLength(50)]],
    feedbackReferer: [''],
    feedbackUserAgent: [''],
    feedbackIpAddress: [''],
    feedbackIsContactRequest: ['', Validators.required],
    feedbackId: [''],
    feedbackStatus: [''],
    feedbackCreatedBy: [''],
    feedbackCreatedDate: [''],
    feedbackLastModifiedBy: [''],
    feedbackLastModifiedDate: [''],
    feedbackTimestamp: [''],
  });

  constructor(
    private feedbackService: FeedbackService,
    private routingHelper: RoutingHelperService,
    private fb: FormBuilder
  ) {
    this.theModel = new Feedback();
  }

  ngOnInit() {
    this.theId = this.routingHelper.getId();

    if (this.theId === '0') {
      this.initializeToBlank();
    } else {
      this.loadById(this.theId);
    }
  }

  public readonly fieldNameFeedbackFeedbackType: string =
    'feedbackFeedbackType';
  public get feedbackType(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackFeedbackType);
  }
  public readonly fieldNameFeedbackSentiment: string = 'feedbackSentiment';
  public get sentiment(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackSentiment);
  }
  public readonly fieldNameFeedbackSubject: string = 'feedbackSubject';
  public get subject(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackSubject);
  }
  public readonly fieldNameFeedbackFeedbackText: string =
    'feedbackFeedbackText';
  public get feedbackText(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackFeedbackText);
  }
  public readonly fieldNameFeedbackUsername: string = 'feedbackUsername';
  public get username(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackUsername);
  }
  public readonly fieldNameFeedbackFirstName: string = 'feedbackFirstName';
  public get firstName(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackFirstName);
  }
  public readonly fieldNameFeedbackLastName: string = 'feedbackLastName';
  public get lastName(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackLastName);
  }
  public readonly fieldNameFeedbackReferer: string = 'feedbackReferer';
  public get referer(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackReferer);
  }
  public readonly fieldNameFeedbackUserAgent: string = 'feedbackUserAgent';
  public get userAgent(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackUserAgent);
  }
  public readonly fieldNameFeedbackIpAddress: string = 'feedbackIpAddress';
  public get ipAddress(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackIpAddress);
  }
  public readonly fieldNameFeedbackIsContactRequest: string =
    'feedbackIsContactRequest';
  public get isContactRequest(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackIsContactRequest);
  }
  public readonly fieldNameFeedbackId: string = 'feedbackId';
  public get id(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackId);
  }
  public readonly fieldNameFeedbackStatus: string = 'feedbackStatus';
  public get status(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackStatus);
  }
  public readonly fieldNameFeedbackCreatedBy: string = 'feedbackCreatedBy';
  public get createdBy(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackCreatedBy);
  }
  public readonly fieldNameFeedbackCreatedDate: string = 'feedbackCreatedDate';
  public get createdDate(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackCreatedDate);
  }
  public readonly fieldNameFeedbackLastModifiedBy: string =
    'feedbackLastModifiedBy';
  public get lastModifiedBy(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackLastModifiedBy);
  }
  public readonly fieldNameFeedbackLastModifiedDate: string =
    'feedbackLastModifiedDate';
  public get lastModifiedDate(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackLastModifiedDate);
  }
  public readonly fieldNameFeedbackTimestamp: string = 'feedbackTimestamp';
  public get timestamp(): AbstractControl | null {
    return this.theForm.get(this.fieldNameFeedbackTimestamp);
  }

  afterLoad() {
    if (this.theModel !== null) {
      console.log('afterLoad() -- theModel is not null');

      /*
      if (!this.feedbackFeedbackType) {
    console.log('afterLoad() -- feedbackFeedbackType is null or undefined');
  } else {
    console.log('afterLoad() -- setting selected value on feedbackFeedbackType');
    this.feedbackFeedbackType.selectedValue = this.theModel.feedbackType;
  }
if (!this.feedbackSentiment) {
    console.log('afterLoad() -- feedbackSentiment is null or undefined');
  } else {
    console.log('afterLoad() -- setting selected value on feedbackSentiment');
    this.feedbackSentiment.selectedValue = this.theModel.sentiment;
  }
if (!this.feedbackStatus) {
    console.log('afterLoad() -- feedbackStatus is null or undefined');
  } else {
    console.log('afterLoad() -- setting selected value on feedbackStatus');
    this.feedbackStatus.selectedValue = this.theModel.status;
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

      this.feedbackService.save(this.theModel).subscribe(
        (data: Feedback) => {
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
      const msg = 'feedback form is in an invalid state';
      this.message = msg;
      console.info(msg);
    }
  }

  beforeSave() {
    if (this.theModel !== null) {
      console.log('beforeSave() -- theModel is not null');
      this.populateModelFromForm();
      /*
      if (!this.feedbackFeedbackType) {
    console.log('beforeSave() -- feedbackFeedbackType is null or undefined');
  } else {
    console.log('beforeSave() -- setting selected value from feedbackFeedbackType');
    this.theModel.feedbackType = this.feedbackFeedbackType.selectedValue;
  }
if (!this.feedbackSentiment) {
    console.log('beforeSave() -- feedbackSentiment is null or undefined');
  } else {
    console.log('beforeSave() -- setting selected value from feedbackSentiment');
    this.theModel.sentiment = this.feedbackSentiment.selectedValue;
  }
if (!this.feedbackStatus) {
    console.log('beforeSave() -- feedbackStatus is null or undefined');
  } else {
    console.log('beforeSave() -- setting selected value from feedbackStatus');
    this.theModel.status = this.feedbackStatus.selectedValue;
  }

      */
    } else {
      console.log('beforeSave() -- theModel is null');
    }
  }

  navigateToList() {
    // this.router.navigate(['/feedback/feedback-list']);
    this.routingHelper.navigateTo('/feedback/feedback-list');
  }

  cancel() {
    this.routingHelper.back();
  }

  delete() {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (this.theId !== '0') {
        this.feedbackService.deleteById(Number(this.theId)).subscribe(
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
    const temp = new Feedback();
    this.theModel = temp;

    this.populateFormFromModel();
  }
  private populateModelFromForm() {
    const toValue = this.theModel;

    toValue.feedbackType = this.feedbackFeedbackType!.selectedValue;
    toValue.sentiment = this.feedbackSentiment!.selectedValue;
    toValue.subject = this.subject!.value;
    toValue.feedbackText = this.feedbackText!.value;
    toValue.username = this.username!.value;
    toValue.firstName = this.firstName!.value;
    toValue.lastName = this.lastName!.value;
    toValue.referer = this.referer!.value;
    toValue.userAgent = this.userAgent!.value;
    toValue.ipAddress = this.ipAddress!.value;
    toValue.isContactRequest = this.isContactRequest!.value;
    toValue.status = this.feedbackStatus!.selectedValue;
    toValue.createdBy = this.createdBy!.value;
    toValue.createdDate = this.createdDate!.value;
    toValue.lastModifiedBy = this.lastModifiedBy!.value;
    toValue.lastModifiedDate = this.lastModifiedDate!.value;
    toValue.timestamp = this.timestamp!.value;
  }

  private populateFormFromModel() {
    const fromValue = this.theModel;

    this.feedbackType?.setValue(fromValue.feedbackType);
    this.sentiment?.setValue(fromValue.sentiment);
    this.subject?.setValue(fromValue.subject);
    this.feedbackText?.setValue(fromValue.feedbackText);
    this.username?.setValue(fromValue.username);
    this.firstName?.setValue(fromValue.firstName);
    this.lastName?.setValue(fromValue.lastName);
    this.referer?.setValue(fromValue.referer);
    this.userAgent?.setValue(fromValue.userAgent);
    this.ipAddress?.setValue(fromValue.ipAddress);
    this.isContactRequest?.setValue(fromValue.isContactRequest);
    this.id?.setValue(fromValue.id);
    this.status?.setValue(fromValue.status);
    this.createdBy?.setValue(fromValue.createdBy);
    this.createdDate?.setValue(fromValue.createdDate);
    this.lastModifiedBy?.setValue(fromValue.lastModifiedBy);
    this.lastModifiedDate?.setValue(fromValue.lastModifiedDate);
    this.timestamp?.setValue(fromValue.timestamp);
  }

  private loadById(id: string) {
    this.feedbackService.getById(Number(id)).subscribe(
      (item: Feedback | null) => {
        if (item === null) {
          this.theModel = new Feedback();
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
