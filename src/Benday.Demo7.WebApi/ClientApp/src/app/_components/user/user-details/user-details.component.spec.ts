import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { RoutingHelperService } from '../../../_services/routing-helper.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../../_services/user.service';
import { EMPTY, Observable, of, throwError } from 'rxjs';

import { User } from '../../../_models/user';
import { ApplicationError } from 'src/app/_common/application-error';
import { UserTestUtilities } from 'src/app/_models/user-test-utilities';
import { LookupDropdownControlComponent } from '../../lookup-dropdown-control/lookup-dropdown-control.component';
import { MockRoutingHelperService } from 'src/app/_common/mock-routing-helper-service';
import { LookupService } from 'src/app/_services/lookup.service';
import { Lookup } from 'src/app/_models/lookup';
import { LookupTestUtilities } from 'src/app/_models/lookup-test-utilities';
import { ApplicationConstants } from 'src/app/_common/application-constants';
import { TestUtilities } from 'src/app/_common/test-utilities';
import { MockLookupService } from 'src/app/_common/mock-lookup-service';

import { UserClaimListComponent } from '../../user-claim/user-claim-list/user-claim-list.component';

describe('UserDetailsComponent', () => {
  let systemUnderTest: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
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
      declarations: [
        UserDetailsComponent,
        LookupDropdownControlComponent,
        UserClaimListComponent,
      ],
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
    fixture = TestBed.createComponent(UserDetailsComponent);
    systemUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(systemUnderTest).toBeTruthy();
  });

  it('should load by id and populate when there is data', () => {
    const fakeUser = UserTestUtilities.getFakeUser();

    routingHelper.getIdReturnValue = '123';

    const service = fixture.debugElement.injector.get(UserService);

    spyOn(service, 'getById').and.returnValue(of<User>(fakeUser));

    systemUnderTest.ngOnInit();

    expect(service.getById).toHaveBeenCalled();

    expect(systemUnderTest).toBeTruthy();

    expect(systemUnderTest.theModel).not.toBeNull();

    expect(systemUnderTest.theModel).toBe(fakeUser);
  });

  it('should set message to no data when there is no data', () => {
    routingHelper.getIdReturnValue = '123';

    const service = fixture.debugElement.injector.get(UserService);

    spyOn(service, 'getById').and.returnValue(of(null));

    systemUnderTest.ngOnInit();

    expect(service.getById).toHaveBeenCalled();

    expect(systemUnderTest).toBeTruthy();

    expect(systemUnderTest.message).not.toBeNull();

    expect(systemUnderTest.message).toBe(ApplicationConstants.noDataMessage);
  });

  it('should save a new item and populate the id value with the generated id', () => {
    // arrange
    const expected = UserTestUtilities.getFakeUser();
    const expectedId = 999999;
    expected.id = expectedId;

    routingHelper.getIdReturnValue = '0';

    const service = fixture.debugElement.injector.get(UserService);

    const serviceMethodSpy = spyOn(service, 'save');

    serviceMethodSpy.and.returnValue(of<User>(expected));

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

    const service = fixture.debugElement.injector.get(UserService);

    const serviceMethodSpy = spyOn(service, 'save');

    systemUnderTest.ngOnInit();

    configureFormValidityAndAssert(false);

    systemUnderTest.save();

    expect(systemUnderTest.message).toBe('user form is in an invalid state');
  });

  it('if there is a message displayed, clear the message when save is called', () => {
    routingHelper.getIdReturnValue = '0';

    const service = fixture.debugElement.injector.get(UserService);

    const serviceMethodSpy = spyOn(service, 'save');
    serviceMethodSpy.and.returnValue(of<User>(new User()));

    systemUnderTest.ngOnInit();

    configureFormValidityAndAssert(false);

    systemUnderTest.save();

    expect(systemUnderTest.message).toBe('user form is in an invalid state');

    configureFormValidityAndAssert(true);

    systemUnderTest.save();

    expect(systemUnderTest.message).toBe(ApplicationConstants.savedMessage);
  });

  it('should not call user service to save if the form is invalid', () => {
    routingHelper.getIdReturnValue = '0';

    const service = fixture.debugElement.injector.get(UserService);

    const serviceMethodSpy = spyOn(service, 'save');

    systemUnderTest.ngOnInit();

    configureFormValidityAndAssert(false);

    systemUnderTest.save();

    expect(serviceMethodSpy).not.toHaveBeenCalled();
  });

  it('should set an error message if call to service.loadById() fails', () => {
    routingHelper.getIdReturnValue = '123';

    const service = fixture.debugElement.injector.get(UserService);

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

    const service = fixture.debugElement.injector.get(UserService);

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
  it('should have a form control for Username', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.username,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserUsername)
    );
  });
  it('should have a form control for Source', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.source,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserSource)
    );
  });
  it('should have a form control for EmailAddress', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.emailAddress,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserEmailAddress)
    );
  });
  it('should have a form control for FirstName', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.firstName,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserFirstName)
    );
  });
  it('should have a form control for LastName', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.lastName,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserLastName)
    );
  });
  it('should have a form control for PhoneNumber', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.phoneNumber,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserPhoneNumber)
    );
  });
  it('should have a form control for Claims', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.claims,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserClaims)
    );
  });
  it('should have a form control for Id', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.id,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserId)
    );
  });
  it('should have a form control for Status', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.status,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserStatus)
    );
  });
  it('should have a form control for CreatedBy', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.createdBy,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserCreatedBy)
    );
  });
  it('should have a form control for CreatedDate', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.createdDate,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserCreatedDate)
    );
  });
  it('should have a form control for LastModifiedBy', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.lastModifiedBy,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserLastModifiedBy)
    );
  });
  it('should have a form control for LastModifiedDate', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.lastModifiedDate,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserLastModifiedDate)
    );
  });
  it('should have a form control for Timestamp', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.timestamp,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserTimestamp)
    );
  });
});
