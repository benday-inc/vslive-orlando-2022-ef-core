import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LogEntryDetailsComponent } from './log-entry-details.component';
import { RoutingHelperService } from '../../../_services/routing-helper.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LogEntryService } from '../../../_services/log-entry.service';
import { EMPTY, Observable, of, throwError } from 'rxjs';

import { LogEntry } from '../../../_models/log-entry';
import { ApplicationError } from 'src/app/_common/application-error';
import { LogEntryTestUtilities } from 'src/app/_models/log-entry-test-utilities';
import { LookupDropdownControlComponent } from '../../lookup-dropdown-control/lookup-dropdown-control.component';
import { MockRoutingHelperService } from 'src/app/_common/mock-routing-helper-service';
import { LookupService } from 'src/app/_services/lookup.service';
import { Lookup } from 'src/app/_models/lookup';
import { LookupTestUtilities } from 'src/app/_models/lookup-test-utilities';
import { ApplicationConstants } from 'src/app/_common/application-constants';
import { TestUtilities } from 'src/app/_common/test-utilities';
import { MockLookupService } from 'src/app/_common/mock-lookup-service';

describe('LogEntryDetailsComponent', () => {
  let systemUnderTest: LogEntryDetailsComponent;
  let fixture: ComponentFixture<LogEntryDetailsComponent>;
  let routingHelper: MockRoutingHelperService;
  let formValiditySpy: jasmine.Spy<jasmine.Func> | null = null;
  const expectedDefaultErrorMessage = 'BOOM!';
  const expectedDefaultErrorFormattedMessage =
    'An error occurred.  999 - BOOM! - BOOM!';

  afterEach(() => {
    formValiditySpy = null;
  });

  beforeEach(waitForAsync(() => {
    routingHelper = new MockRoutingHelperService();

    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    const lookupServiceMock = new MockLookupService(
      httpClientSpy,
      TestUtilities.baseUrl
    );

    TestBed.configureTestingModule({
      declarations: [LogEntryDetailsComponent, LookupDropdownControlComponent],
      imports: [HttpClientModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: RoutingHelperService,
          useValue: routingHelper,
        },
        {
          provide: 'BASE_URL',
          useValue: TestUtilities.baseUrl,
        },
        {
          provide: LookupService,
          useValue: lookupServiceMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogEntryDetailsComponent);
    systemUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(systemUnderTest).toBeTruthy();
  });

  it('should load by id and populate when there is data', () => {
    const fakeLogEntry = LogEntryTestUtilities.getFakeLogEntry();

    routingHelper.getIdReturnValue = '123';

    const service = fixture.debugElement.injector.get(LogEntryService);

    spyOn(service, 'getById').and.returnValue(of<LogEntry>(fakeLogEntry));

    systemUnderTest.ngOnInit();

    expect(service.getById).toHaveBeenCalled();

    expect(systemUnderTest).toBeTruthy();

    expect(systemUnderTest.theModel).not.toBeNull();

    expect(systemUnderTest.theModel).toBe(fakeLogEntry);
  });

  it('should set message to no data when there is no data', () => {
    routingHelper.getIdReturnValue = '123';

    const service = fixture.debugElement.injector.get(LogEntryService);

    spyOn(service, 'getById').and.returnValue(of(null));

    systemUnderTest.ngOnInit();

    expect(service.getById).toHaveBeenCalled();

    expect(systemUnderTest).toBeTruthy();

    expect(systemUnderTest.message).not.toBeNull();

    expect(systemUnderTest.message).toBe(ApplicationConstants.noDataMessage);
  });

  it('should save a new item and populate the id value with the generated id', () => {
    // arrange
    const expected = LogEntryTestUtilities.getFakeLogEntry();
    const expectedId = 999999;
    expected.id = expectedId;

    routingHelper.getIdReturnValue = '0';

    const service = fixture.debugElement.injector.get(LogEntryService);

    const serviceMethodSpy = spyOn(service, 'save');

    serviceMethodSpy.and.returnValue(of<LogEntry>(expected));

    systemUnderTest.ngOnInit();

    expect(systemUnderTest.theId).toBe('0');
    expect(systemUnderTest.theModel).not.toBeNull();
    expect(systemUnderTest.theModel.id).toBe(0);

    configureFormValidityAndAssert(true);

    // act
    systemUnderTest.save();

    // assert
    expect(serviceMethodSpy).toHaveBeenCalled();
    expect(serviceMethodSpy.calls.count()).toBe(1);
    expect(serviceMethodSpy.calls).not.toBeNull();
    expect(serviceMethodSpy.calls.first().args).not.toBeNull();
    expect(systemUnderTest.theId).toBe(expectedId.toString());
  });

  it('should set a message on save if the form is invalid', () => {
    routingHelper.getIdReturnValue = '0';

    const service = fixture.debugElement.injector.get(LogEntryService);

    const serviceMethodSpy = spyOn(service, 'save');

    systemUnderTest.ngOnInit();

    configureFormValidityAndAssert(false);

    systemUnderTest.save();

    expect(systemUnderTest.message).toBe(
      'log entries form is in an invalid state'
    );
  });

  it('if there is a message displayed, clear the message when save is called', () => {
    routingHelper.getIdReturnValue = '0';

    const service = fixture.debugElement.injector.get(LogEntryService);

    const serviceMethodSpy = spyOn(service, 'save');
    serviceMethodSpy.and.returnValue(of<LogEntry>(new LogEntry()));

    systemUnderTest.ngOnInit();

    configureFormValidityAndAssert(false);

    systemUnderTest.save();

    expect(systemUnderTest.message).toBe(
      'log entries form is in an invalid state'
    );

    configureFormValidityAndAssert(true);

    systemUnderTest.save();

    expect(systemUnderTest.message).toBe(ApplicationConstants.savedMessage);
  });

  it('should not call log entries service to save if the form is invalid', () => {
    routingHelper.getIdReturnValue = '0';

    const service = fixture.debugElement.injector.get(LogEntryService);

    const serviceMethodSpy = spyOn(service, 'save');

    systemUnderTest.ngOnInit();

    configureFormValidityAndAssert(false);

    systemUnderTest.save();

    expect(serviceMethodSpy).not.toHaveBeenCalled();
  });

  it('should set an error message if call to service.loadById() fails', () => {
    routingHelper.getIdReturnValue = '123';

    const service = fixture.debugElement.injector.get(LogEntryService);

    const serviceMethodSpy = spyOn(service, 'getById');

    const expectedErrorMessage = expectedDefaultErrorMessage;
    const expectedError = new ApplicationError();
    expectedError.initialize(expectedErrorMessage);

    serviceMethodSpy.and.returnValue(throwError(expectedError));

    systemUnderTest.ngOnInit();

    expect(systemUnderTest).toBeTruthy();
    expect(serviceMethodSpy).toHaveBeenCalled();
    expect(systemUnderTest.message).toBe(expectedDefaultErrorFormattedMessage);
  });

  it('should set an error message if call to service.save() fails', () => {
    routingHelper.getIdReturnValue = '0';

    const service = fixture.debugElement.injector.get(LogEntryService);

    const serviceMethodSpy = spyOn(service, 'save');

    const expectedErrorMessage = expectedDefaultErrorMessage;
    const expectedError = new ApplicationError();
    expectedError.initialize(expectedErrorMessage);

    serviceMethodSpy.and.returnValue(throwError(expectedError));

    systemUnderTest.ngOnInit();

    configureFormValidityAndAssert(true);

    systemUnderTest.save();

    expect(serviceMethodSpy).toHaveBeenCalled();
    expect(systemUnderTest.message).toBe(expectedDefaultErrorFormattedMessage);
  });

  function configureFormValidityAndAssert(actual: boolean) {
    if (!formValiditySpy) {
      formValiditySpy = spyOnProperty(systemUnderTest.theForm, 'valid');
    }

    formValiditySpy.and.returnValue(actual);

    if (actual === true) {
      expect(systemUnderTest.theForm.valid).toBeTruthy('form should be valid');
    } else {
      expect(systemUnderTest.theForm.valid).toBeFalsy('form should be invalid');
    }
  }
  it('should have a form control for Id', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.id,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameLogEntryId)
    );
  });
  it('should have a form control for Category', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.category,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameLogEntryCategory)
    );
  });
  it('should have a form control for LogLevel', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.logLevel,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameLogEntryLogLevel)
    );
  });
  it('should have a form control for LogText', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.logText,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameLogEntryLogText)
    );
  });
  it('should have a form control for ExceptionText', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.exceptionText,
      systemUnderTest.theForm.get(
        systemUnderTest.fieldNameLogEntryExceptionText
      )
    );
  });
  it('should have a form control for EventId', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.eventId,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameLogEntryEventId)
    );
  });
  it('should have a form control for State', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.state,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameLogEntryState)
    );
  });
  it('should have a form control for LogDate', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.logDate,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameLogEntryLogDate)
    );
  });
});
