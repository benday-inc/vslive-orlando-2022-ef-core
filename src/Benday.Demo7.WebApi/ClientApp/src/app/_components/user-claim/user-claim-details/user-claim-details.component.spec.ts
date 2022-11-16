import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserClaimDetailsComponent } from './user-claim-details.component';
import { RoutingHelperService } from '../../../_services/routing-helper.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserClaimService } from '../../../_services/user-claim.service';
import { EMPTY, Observable, of, throwError } from 'rxjs';

import { UserClaim } from '../../../_models/user-claim';
import { ApplicationError } from 'src/app/_common/application-error';
import { UserClaimTestUtilities } from 'src/app/_models/user-claim-test-utilities';
import { LookupDropdownControlComponent } from '../../lookup-dropdown-control/lookup-dropdown-control.component';
import { MockRoutingHelperService } from 'src/app/_common/mock-routing-helper-service';
import { LookupService } from 'src/app/_services/lookup.service';
import { Lookup } from 'src/app/_models/lookup';
import { LookupTestUtilities } from 'src/app/_models/lookup-test-utilities';
import { ApplicationConstants } from 'src/app/_common/application-constants';
import { TestUtilities } from 'src/app/_common/test-utilities';
import { MockLookupService } from 'src/app/_common/mock-lookup-service';

describe('UserClaimDetailsComponent', () => {
  let systemUnderTest: UserClaimDetailsComponent;
  let fixture: ComponentFixture<UserClaimDetailsComponent>;
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
      declarations: [UserClaimDetailsComponent, LookupDropdownControlComponent],
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
    fixture = TestBed.createComponent(UserClaimDetailsComponent);
    systemUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(systemUnderTest).toBeTruthy();
  });

  it('should load by id and populate when there is data', () => {
    const fakeUserClaim = UserClaimTestUtilities.getFakeUserClaim();

    routingHelper.getIdReturnValue = '123';

    const service = fixture.debugElement.injector.get(UserClaimService);

    spyOn(service, 'getById').and.returnValue(of<UserClaim>(fakeUserClaim));

    systemUnderTest.ngOnInit();

    expect(service.getById).toHaveBeenCalled();

    expect(systemUnderTest).toBeTruthy();

    expect(systemUnderTest.theModel).not.toBeNull();

    expect(systemUnderTest.theModel).toBe(fakeUserClaim);
  });

  it('should set message to no data when there is no data', () => {
    routingHelper.getIdReturnValue = '123';

    const service = fixture.debugElement.injector.get(UserClaimService);

    spyOn(service, 'getById').and.returnValue(of(null));

    systemUnderTest.ngOnInit();

    expect(service.getById).toHaveBeenCalled();

    expect(systemUnderTest).toBeTruthy();

    expect(systemUnderTest.message).not.toBeNull();

    expect(systemUnderTest.message).toBe(ApplicationConstants.noDataMessage);
  });

  it('should save a new item and populate the id value with the generated id', () => {
    // arrange
    const expected = UserClaimTestUtilities.getFakeUserClaim();
    const expectedId = 999999;
    expected.id = expectedId;

    routingHelper.getIdReturnValue = '0';

    const service = fixture.debugElement.injector.get(UserClaimService);

    const serviceMethodSpy = spyOn(service, 'save');

    serviceMethodSpy.and.returnValue(of<UserClaim>(expected));

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

    const service = fixture.debugElement.injector.get(UserClaimService);

    const serviceMethodSpy = spyOn(service, 'save');

    systemUnderTest.ngOnInit();

    configureFormValidityAndAssert(false);

    systemUnderTest.save();

    expect(systemUnderTest.message).toBe(
      'user claim form is in an invalid state'
    );
  });

  it('if there is a message displayed, clear the message when save is called', () => {
    routingHelper.getIdReturnValue = '0';

    const service = fixture.debugElement.injector.get(UserClaimService);

    const serviceMethodSpy = spyOn(service, 'save');
    serviceMethodSpy.and.returnValue(of<UserClaim>(new UserClaim()));

    systemUnderTest.ngOnInit();

    configureFormValidityAndAssert(false);

    systemUnderTest.save();

    expect(systemUnderTest.message).toBe(
      'user claim form is in an invalid state'
    );

    configureFormValidityAndAssert(true);

    systemUnderTest.save();

    expect(systemUnderTest.message).toBe(ApplicationConstants.savedMessage);
  });

  it('should not call user claim service to save if the form is invalid', () => {
    routingHelper.getIdReturnValue = '0';

    const service = fixture.debugElement.injector.get(UserClaimService);

    const serviceMethodSpy = spyOn(service, 'save');

    systemUnderTest.ngOnInit();

    configureFormValidityAndAssert(false);

    systemUnderTest.save();

    expect(serviceMethodSpy).not.toHaveBeenCalled();
  });

  it('should set an error message if call to service.loadById() fails', () => {
    routingHelper.getIdReturnValue = '123';

    const service = fixture.debugElement.injector.get(UserClaimService);

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

    const service = fixture.debugElement.injector.get(UserClaimService);

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
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserClaimUsername)
    );
  });
  it('should have a form control for ClaimName', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.claimName,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserClaimClaimName)
    );
  });
  it('should have a form control for ClaimValue', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.claimValue,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserClaimClaimValue)
    );
  });
  it('should have a form control for UserId', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.userId,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserClaimUserId)
    );
  });
  it('should have a form control for User', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.user,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserClaimUser)
    );
  });
  it('should have a form control for ClaimLogicType', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.claimLogicType,
      systemUnderTest.theForm.get(
        systemUnderTest.fieldNameUserClaimClaimLogicType
      )
    );
  });
  it('should have a form control for StartDate', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.startDate,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserClaimStartDate)
    );
  });
  it('should have a form control for EndDate', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.endDate,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserClaimEndDate)
    );
  });
  it('should have a form control for Id', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.id,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserClaimId)
    );
  });
  it('should have a form control for Status', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.status,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserClaimStatus)
    );
  });
  it('should have a form control for CreatedBy', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.createdBy,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserClaimCreatedBy)
    );
  });
  it('should have a form control for CreatedDate', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.createdDate,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserClaimCreatedDate)
    );
  });
  it('should have a form control for LastModifiedBy', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.lastModifiedBy,
      systemUnderTest.theForm.get(
        systemUnderTest.fieldNameUserClaimLastModifiedBy
      )
    );
  });
  it('should have a form control for LastModifiedDate', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.lastModifiedDate,
      systemUnderTest.theForm.get(
        systemUnderTest.fieldNameUserClaimLastModifiedDate
      )
    );
  });
  it('should have a form control for Timestamp', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.timestamp,
      systemUnderTest.theForm.get(systemUnderTest.fieldNameUserClaimTimestamp)
    );
  });
});
