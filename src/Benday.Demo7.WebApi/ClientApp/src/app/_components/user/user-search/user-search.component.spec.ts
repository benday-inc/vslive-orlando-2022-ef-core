import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserSearchComponent } from './user-search.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/_services/user.service';
import { ApplicationError } from 'src/app/_common/application-error';
import { throwError, of } from 'rxjs';
import { User } from 'src/app/_models/user';
import { UserTestUtilities } from 'src/app/_models/user-test-utilities';
import { ApplicationConstants } from 'src/app/_common/application-constants';
import { TestUtilities } from 'src/app/_common/test-utilities';
import { SimpleSearchResults } from 'src/app/_common/simple-search-results';

describe('UserSearchComponent', () => {
  let systemUnderTest: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserSearchComponent],
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
    fixture = TestBed.createComponent(UserSearchComponent);
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
    const service = fixture.debugElement.injector.get(UserService);

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

  it('should populate list of user items on successful search', () => {
    // arrange
    const service = fixture.debugElement.injector.get(UserService);

    const serviceMethodSpy = spyOn(service, 'search');

    const items = UserTestUtilities.getFakeUsers(10);
    const results = new SimpleSearchResults<User>();
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
    const service = fixture.debugElement.injector.get(UserService);

    const serviceSearchMethodSpy = spyOn(service, 'search');

    // empty results from search
    serviceSearchMethodSpy.and.returnValue(of(new SimpleSearchResults<User>()));

    systemUnderTest.ngOnInit();

    const testForm = { valid: true } as NgForm;

    systemUnderTest.searchValue = 'asdf';
    systemUnderTest.search(testForm);

    // should be no results before act
    expect(systemUnderTest.items).not.toBeNull();
    expect(systemUnderTest.items.currentPageValues.length).toBe(0);

    // return results now
    const items = UserTestUtilities.getFakeUsers(10);
    const results = new SimpleSearchResults<User>();
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
    const service = fixture.debugElement.injector.get(UserService);

    const serviceMethodSpy = spyOn(service, 'search');
    serviceMethodSpy.and.returnValue(of(new SimpleSearchResults<User>()));

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

  it('should populate list of user items on successful load', () => {
    const service = fixture.debugElement.injector.get(UserService);

    const serviceMethodSpy = spyOn(service, 'search');

    const items = UserTestUtilities.getFakeUsers(10);

    const results = new SimpleSearchResults<User>();
    results.currentPageValues = items;

    serviceMethodSpy.and.returnValue(of(results));

    systemUnderTest.ngOnInit();

    expect(systemUnderTest).toBeTruthy();
    expect(serviceMethodSpy).toHaveBeenCalled();
    expect(systemUnderTest.message).toBe(ApplicationConstants.emptyMessage);
    expect(systemUnderTest.items).not.toBeNull();
    expect(systemUnderTest.items.currentPageValues.length).toBe(10);
  });

  it('should not populate list of user items automatically if autoload is false', () => {
    systemUnderTest.autoLoad = false;

    const service = fixture.debugElement.injector.get(UserService);

    const serviceMethodSpy = spyOn(service, 'search');

    const items = UserTestUtilities.getFakeUsers(10);

    const results = new SimpleSearchResults<User>();
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
    const service = fixture.debugElement.injector.get(UserService);

    const serviceMethodSpy = spyOn(service, 'search');
    serviceMethodSpy.and.returnValue(of(new SimpleSearchResults<User>()));

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
