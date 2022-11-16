import { TestBed } from '@angular/core/testing';
import { UserClaimService } from './user-claim.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { UserClaim } from '../_models/user-claim';
import { UserClaimTestUtilities } from '../_models/user-claim-test-utilities';
import { ApplicationError } from '../_common/application-error';
import { TestUtilities } from '../_common/test-utilities';
import { SimpleSearchResults } from '../_common/simple-search-results';

describe('UserClaimService', () => {
  let systemUnderTest: UserClaimService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: 'BASE_URL',
          useValue: TestUtilities.baseUrl,
        },
        UserClaimService,
      ],
    });

    systemUnderTest = TestBed.get(UserClaimService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(systemUnderTest).toBeTruthy();
  });

  it('should GET all user claim items', () => {
    const items = UserClaimTestUtilities.getFakeUserClaims(10);

    systemUnderTest.getList().subscribe((data: UserClaim[]) => {
      expect(data.length).toBe(10);
    });

    const request: TestRequest =
      httpTestingController.expectOne('/api/userclaim');
    expect(request.request.method).toEqual('GET');

    request.flush(items);
  });

  it('should return ApplicationError if get all user claim fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;

    systemUnderTest.getList().subscribe(
      (data: UserClaim[]) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest =
      httpTestingController.expectOne('/api/userclaim');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should run simple search for user claim via GET and return items', () => {
    const items = new SimpleSearchResults<UserClaim>();
    items.currentPageValues = UserClaimTestUtilities.getFakeUserClaims(10);

    const searchString = 'asdf';

    systemUnderTest
      .search(searchString)
      .subscribe((data: SimpleSearchResults<UserClaim>) => {
        expect(data.currentPageValues.length).toBe(10);
      });

    const request: TestRequest = httpTestingController.expectOne(
      `/api/userclaim/simplesearch/${searchString}`
    );
    expect(request.request.method).toEqual('GET');

    request.flush(items);
  });

  it('should return ApplicationError if simple search for user claim fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const searchString = 'asdf';

    systemUnderTest.search(searchString).subscribe(
      (data: SimpleSearchResults<UserClaim>) =>
        fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      `/api/userclaim/simplesearch/${searchString}`
    );

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should GET one user claim item by id', () => {
    const item = UserClaimTestUtilities.getFakeUserClaim();

    systemUnderTest.getById(item.id).subscribe((data: UserClaim | null) => {
      expect(data).toBe(item);
    });

    const request: TestRequest = httpTestingController.expectOne(
      `/api/userclaim/${item.id}`
    );
    expect(request.request.method).toEqual('GET');

    request.flush(item);
  });

  it('should return ApplicationError if get user claim by id fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const expectedId = 12341234;

    systemUnderTest.getById(expectedId).subscribe(
      (data: UserClaim | null) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      `/api/userclaim/${expectedId}`
    );
    expect(request.request.method).toEqual('GET');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should DELETE one user claim item by id', () => {
    const item = UserClaimTestUtilities.getFakeUserClaim();

    systemUnderTest.deleteById(item.id).subscribe((data: UserClaim) => {
      expect(data).toBe(item);
    });

    const request: TestRequest = httpTestingController.expectOne(
      `/api/userclaim/${item.id}`
    );
    expect(request.request.method).toEqual('DELETE');

    request.flush(item);
  });

  it('should return ApplicationError if delete user claim by id fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const expectedId = 12341234;

    systemUnderTest.deleteById(expectedId).subscribe(
      (data: UserClaim) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      `/api/userclaim/${expectedId}`
    );
    expect(request.request.method).toEqual('DELETE');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should POST one user claim item when save user claim is called', () => {
    const item = UserClaimTestUtilities.getFakeUserClaim();

    systemUnderTest.save(item).subscribe((data: UserClaim) => {
      expect(data).toBe(item);
    });

    const request: TestRequest =
      httpTestingController.expectOne('/api/userclaim');
    expect(request.request.method).toEqual('POST');

    request.flush(item);
  });

  it('should return ApplicationError if save user claim fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const item = UserClaimTestUtilities.getFakeUserClaim();

    systemUnderTest.save(item).subscribe(
      (data: UserClaim) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest =
      httpTestingController.expectOne('/api/userclaim');
    expect(request.request.method).toEqual('POST');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });
});
