import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserClaimSearchComponent } from './user-claim-search.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserClaimService } from 'src/app/_services/user-claim.service';
import { ApplicationError } from 'src/app/_common/application-error';
import { throwError, of } from 'rxjs';
import { UserClaim } from 'src/app/_models/user-claim';
import { UserClaimTestUtilities } from 'src/app/_models/user-claim-test-utilities';
import { ApplicationConstants } from 'src/app/_common/application-constants';
import { TestUtilities } from 'src/app/_common/test-utilities';
import { SimpleSearchResults } from 'src/app/_common/simple-search-results';

describe('UserClaimSearchComponent', () => {
  let systemUnderTest: UserClaimSearchComponent;
  let fixture: ComponentFixture<UserClaimSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserClaimSearchComponent],
      imports: [HttpClientModule, FormsModule, RouterTestingModule],
      providers: [
        {
          provide: 'BASE_URL',
          useValue: TestUtilities.baseUrl,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserClaimSearchComponent);
    systemUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(systemUnderTest).toBeTruthy();
  });

  it('should initialize to default values', () => {
    systemUnderTest.ngOnInit();

    expect(systemUnderTest).toBeTruthy();
    expect(systemUnderTest.searchValue).toBe(
      ApplicationConstants.emptySearchValue
    );
    expect(systemUnderTest.message).toBe(ApplicationConstants.emptyMessage);
  });

  it('should set an error message if call to service.search() fails', () => {
    // arrange
    const service = fixture.debugElement.injector.get(UserClaimService);

    const serviceMethodSpy = spyOn(service, 'search');

    const expectedErrorMessage = 'BOOM!';
    const expectedError = new ApplicationError();
    expectedError.initialize(expectedErrorMessage);

    serviceMethodSpy.and.returnValue(throwError(expectedError));

    systemUnderTest.ngOnInit();

    const testForm = { valid: true } as NgForm;

    systemUnderTest.searchValue = 'asdf';

    // act
    systemUnderTest.search(testForm);

    // assert
    expect(systemUnderTest).toBeTruthy();
    expect(serviceMethodSpy).toHaveBeenCalled();
    expect(systemUnderTest.message).toBe(expectedErrorMessage);
  });

  it('should populate list of user claim items on successful search', () => {
    // arrange
    const service = fixture.debugElement.injector.get(UserClaimService);

    const serviceMethodSpy = spyOn(service, 'search');

    const items = UserClaimTestUtilities.getFakeUserClaims(10);
    const results = new SimpleSearchResults<UserClaim>();
    results.currentPageValues = items;
    serviceMethodSpy.and.returnValue(of(results));

    systemUnderTest.ngOnInit();

    const testForm = { valid: true } as NgForm;

    systemUnderTest.searchValue = 'asdf';

    // act
    systemUnderTest.search(testForm);

    // assert
    expect(systemUnderTest).toBeTruthy();
    expect(serviceMethodSpy).toHaveBeenCalled();
    expect(systemUnderTest.message).toBe(ApplicationConstants.emptyMessage);
    expect(systemUnderTest.items).not.toBeNull();
    expect(systemUnderTest.items.currentPageValues.length).toBe(10);
  });

  it('reset() should set search to default and call search() with empty search value', () => {
    // arrange
    const service = fixture.debugElement.injector.get(UserClaimService);

    const serviceSearchMethodSpy = spyOn(service, 'search');

    // empty results from search
    serviceSearchMethodSpy.and.returnValue(
      of(new SimpleSearchResults<UserClaim>())
    );

    systemUnderTest.ngOnInit();

    const testForm = { valid: true } as NgForm;

    systemUnderTest.searchValue = 'asdf';
    systemUnderTest.search(testForm);

    // should be no results before act
    expect(systemUnderTest.items).not.toBeNull();
    expect(systemUnderTest.items.currentPageValues.length).toBe(0);

    // return results now
    const items = UserClaimTestUtilities.getFakeUserClaims(10);
    const results = new SimpleSearchResults<UserClaim>();
    results.currentPageValues = items;
    serviceSearchMethodSpy.and.returnValue(of(results));

    // act
    systemUnderTest.reset();

    // assert
    expect(systemUnderTest).toBeTruthy();
    expect(serviceSearchMethodSpy).toHaveBeenCalled();
    expect(systemUnderTest.searchValue).toBe(
      ApplicationConstants.emptySearchValue
    );
    expect(systemUnderTest.message).toBe(ApplicationConstants.emptyMessage);
    expect(systemUnderTest.items).not.toBeNull();
    expect(systemUnderTest.items.currentPageValues.length).toBe(10);
  });

  it('should set message to no data when there is no data', () => {
    // arrange
    const service = fixture.debugElement.injector.get(UserClaimService);

    const serviceMethodSpy = spyOn(service, 'search');
    serviceMethodSpy.and.returnValue(of(new SimpleSearchResults<UserClaim>()));

    systemUnderTest.ngOnInit();

    const testForm = { valid: true } as NgForm;

    systemUnderTest.searchValue = 'asdf';

    // act
    systemUnderTest.search(testForm);

    // assert
    expect(serviceMethodSpy).toHaveBeenCalled();

    expect(systemUnderTest).toBeTruthy();

    expect(systemUnderTest.message).not.toBeNull();

    expect(systemUnderTest.message).toBe(ApplicationConstants.noDataMessage);
  });

  it('should populate list of user claim items on successful load', () => {
    const service = fixture.debugElement.injector.get(UserClaimService);

    const serviceMethodSpy = spyOn(service, 'search');

    const items = UserClaimTestUtilities.getFakeUserClaims(10);

    const results = new SimpleSearchResults<UserClaim>();
    results.currentPageValues = items;

    serviceMethodSpy.and.returnValue(of(results));

    systemUnderTest.ngOnInit();

    expect(systemUnderTest).toBeTruthy();
    expect(serviceMethodSpy).toHaveBeenCalled();
    expect(systemUnderTest.message).toBe(ApplicationConstants.emptyMessage);
    expect(systemUnderTest.items).not.toBeNull();
    expect(systemUnderTest.items.currentPageValues.length).toBe(10);
  });

  it('should not populate list of user claim items automatically if autoload is false', () => {
    systemUnderTest.autoLoad = false;

    const service = fixture.debugElement.injector.get(UserClaimService);

    const serviceMethodSpy = spyOn(service, 'search');

    const items = UserClaimTestUtilities.getFakeUserClaims(10);

    const results = new SimpleSearchResults<UserClaim>();
    results.currentPageValues = items;

    serviceMethodSpy.and.returnValue(of(results));

    systemUnderTest.ngOnInit();

    expect(systemUnderTest).toBeTruthy();
    expect(serviceMethodSpy).not.toHaveBeenCalled();
    expect(systemUnderTest.message).toBe(ApplicationConstants.emptyMessage);
    expect(systemUnderTest.items).not.toBeNull();
    expect(systemUnderTest.items.currentPageValues.length).toBe(0);
  });

  it('should set message to no data when result array has zero items', () => {
    // arrange
    const service = fixture.debugElement.injector.get(UserClaimService);

    const serviceMethodSpy = spyOn(service, 'search');
    serviceMethodSpy.and.returnValue(of(new SimpleSearchResults<UserClaim>()));

    systemUnderTest.ngOnInit();

    const testForm = { valid: true } as NgForm;

    systemUnderTest.searchValue = 'asdf';

    // act
    systemUnderTest.search(testForm);

    // assert
    expect(serviceMethodSpy).toHaveBeenCalled();
    expect(systemUnderTest).toBeTruthy();
    expect(systemUnderTest.message).not.toBeNull();
    expect(systemUnderTest.message).toBe(ApplicationConstants.noDataMessage);
  });
});
