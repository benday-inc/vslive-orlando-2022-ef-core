import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/_services/user.service';
import { ApplicationError } from 'src/app/_common/application-error';
import { EMPTY, throwError, of } from 'rxjs';
import { User } from 'src/app/_models/user';
import { UserTestUtilities } from 'src/app/_models/user-test-utilities';
import { ApplicationConstants } from 'src/app/_common/application-constants';
import { TestUtilities } from 'src/app/_common/test-utilities';

describe('UserListComponent', () => {
  let systemUnderTest: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
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
    fixture = TestBed.createComponent(UserListComponent);
    systemUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(systemUnderTest).toBeTruthy();
  });

  it('should set an error message if call to service.getList() fails', () => {
    const service = fixture.debugElement.injector.get(UserService);

    const serviceMethodSpy = spyOn(service, 'getList');

    const expectedErrorMessage = 'BOOM!';
    const expectedError = new ApplicationError();
    expectedError.initialize(expectedErrorMessage);

    serviceMethodSpy.and.returnValue(throwError(expectedError));

    systemUnderTest.ngOnInit();

    expect(systemUnderTest).toBeTruthy();
    expect(serviceMethodSpy).toHaveBeenCalled();
    expect(systemUnderTest.message).toBe(expectedErrorMessage);
  });

  it('should populate list of user items on successful load', () => {
    const service = fixture.debugElement.injector.get(UserService);

    const serviceMethodSpy = spyOn(service, 'getList');

    const items = UserTestUtilities.getFakeUsers(10);

    serviceMethodSpy.and.returnValue(of(items));

    systemUnderTest.ngOnInit();

    expect(systemUnderTest).toBeTruthy();
    expect(serviceMethodSpy).toHaveBeenCalled();
    expect(systemUnderTest.message).toBe(ApplicationConstants.emptyMessage);
    expect(systemUnderTest.items).not.toBeNull();
    expect(systemUnderTest.items.length).toBe(10);
  });

  it('should not populate list of user items automatically if autoload is false', () => {
    systemUnderTest.autoLoad = false;

    const service = fixture.debugElement.injector.get(UserService);

    const serviceMethodSpy = spyOn(service, 'getList');

    const items = UserTestUtilities.getFakeUsers(10);

    serviceMethodSpy.and.returnValue(of(items));

    systemUnderTest.ngOnInit();

    expect(systemUnderTest).toBeTruthy();
    expect(serviceMethodSpy).not.toHaveBeenCalled();
    expect(systemUnderTest.message).toBe(ApplicationConstants.emptyMessage);
    expect(systemUnderTest.items).not.toBeNull();
    expect(systemUnderTest.items.length).toBe(0);
  });

  it('should set message to no data when result array has zero items', () => {
    const service = fixture.debugElement.injector.get(UserService);

    const serviceMethodSpy = spyOn(service, 'getList');
    serviceMethodSpy.and.returnValue(of(new Array<User>(0)));

    systemUnderTest.ngOnInit();

    expect(serviceMethodSpy).toHaveBeenCalled();

    expect(systemUnderTest).toBeTruthy();

    expect(systemUnderTest.message).not.toBeNull();

    expect(systemUnderTest.message).toBe(ApplicationConstants.noDataMessage);
  });
});
