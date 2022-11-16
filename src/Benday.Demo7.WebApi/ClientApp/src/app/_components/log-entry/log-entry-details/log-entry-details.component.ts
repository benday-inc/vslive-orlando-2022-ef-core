import { Component, OnInit, ViewChild } from '@angular/core';
import { LogEntry } from '../../../_models/log-entry';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LogEntryService } from '../../../_services/log-entry.service';
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

@Component({
  selector: 'app-log-entry-details',
  templateUrl: './log-entry-details.component.html',
  styleUrls: ['./log-entry-details.component.css'],
})
export class LogEntryDetailsComponent implements OnInit {
  public theModel: LogEntry;
  public message: string = ApplicationConstants.emptyMessage;
  public theId: string = ApplicationConstants.emptyMessage;

  theForm = this.fb.group({
    logEntryId: [''],
    logEntryCategory: ['', [Validators.minLength(0)]],
    logEntryLogLevel: ['', [Validators.minLength(0)]],
    logEntryLogText: ['', [Validators.minLength(0)]],
    logEntryExceptionText: ['', [Validators.minLength(0)]],
    logEntryEventId: ['', [Validators.minLength(0)]],
    logEntryState: ['', [Validators.minLength(0)]],
    logEntryLogDate: ['', Validators.required],
  });

  constructor(
    private logEntryService: LogEntryService,
    private routingHelper: RoutingHelperService,
    private fb: FormBuilder
  ) {
    this.theModel = new LogEntry();
  }

  ngOnInit() {
    this.theId = this.routingHelper.getId();

    if (this.theId === '0') {
      this.initializeToBlank();
    } else {
      this.loadById(this.theId);
    }
  }

  public readonly fieldNameLogEntryId: string = 'logEntryId';
  public get id(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLogEntryId);
  }
  public readonly fieldNameLogEntryCategory: string = 'logEntryCategory';
  public get category(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLogEntryCategory);
  }
  public readonly fieldNameLogEntryLogLevel: string = 'logEntryLogLevel';
  public get logLevel(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLogEntryLogLevel);
  }
  public readonly fieldNameLogEntryLogText: string = 'logEntryLogText';
  public get logText(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLogEntryLogText);
  }
  public readonly fieldNameLogEntryExceptionText: string =
    'logEntryExceptionText';
  public get exceptionText(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLogEntryExceptionText);
  }
  public readonly fieldNameLogEntryEventId: string = 'logEntryEventId';
  public get eventId(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLogEntryEventId);
  }
  public readonly fieldNameLogEntryState: string = 'logEntryState';
  public get state(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLogEntryState);
  }
  public readonly fieldNameLogEntryLogDate: string = 'logEntryLogDate';
  public get logDate(): AbstractControl | null {
    return this.theForm.get(this.fieldNameLogEntryLogDate);
  }

  afterLoad() {
    if (this.theModel !== null) {
      console.log('afterLoad() -- theModel is not null');

      /*
      
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

      this.logEntryService.save(this.theModel).subscribe(
        (data: LogEntry) => {
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
      const msg = 'log entries form is in an invalid state';
      this.message = msg;
      console.info(msg);
    }
  }

  beforeSave() {
    if (this.theModel !== null) {
      console.log('beforeSave() -- theModel is not null');
      this.populateModelFromForm();
      /*
      
      */
    } else {
      console.log('beforeSave() -- theModel is null');
    }
  }

  navigateToList() {
    // this.router.navigate(['/log-entry/log-entry-list']);
    this.routingHelper.navigateTo('/log-entry/log-entry-list');
  }

  cancel() {
    this.routingHelper.back();
  }

  delete() {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (this.theId !== '0') {
        this.logEntryService.deleteById(Number(this.theId)).subscribe(
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
    const temp = new LogEntry();
    this.theModel = temp;

    this.populateFormFromModel();
  }
  private populateModelFromForm() {
    const toValue = this.theModel;

    toValue.category = this.category!.value;
    toValue.logLevel = this.logLevel!.value;
    toValue.logText = this.logText!.value;
    toValue.exceptionText = this.exceptionText!.value;
    toValue.eventId = this.eventId!.value;
    toValue.state = this.state!.value;
    toValue.logDate = this.logDate!.value;
  }

  private populateFormFromModel() {
    const fromValue = this.theModel;

    this.id?.setValue(fromValue.id);
    this.category?.setValue(fromValue.category);
    this.logLevel?.setValue(fromValue.logLevel);
    this.logText?.setValue(fromValue.logText);
    this.exceptionText?.setValue(fromValue.exceptionText);
    this.eventId?.setValue(fromValue.eventId);
    this.state?.setValue(fromValue.state);
    this.logDate?.setValue(fromValue.logDate);
  }

  private loadById(id: string) {
    this.logEntryService.getById(Number(id)).subscribe(
      (item: LogEntry | null) => {
        if (item === null) {
          this.theModel = new LogEntry();
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
