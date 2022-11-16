import { TestBed } from '@angular/core/testing';
import { LookupService } from './lookup.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { Lookup } from '../_models/lookup';
import { LookupTestUtilities } from '../_models/lookup-test-utilities';
import { ApplicationError } from '../_common/application-error';
import { TestUtilities } from '../_common/test-utilities';
import { SimpleSearchResults } from '../_common/simple-search-results';

describe('LookupService', () => {
  let systemUnderTest: LookupService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: 'BASE_URL',
          useValue: TestUtilities.baseUrl,
        },
        LookupService,
      ],
    });

    systemUnderTest = TestBed.get(LookupService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(systemUnderTest).toBeTruthy();
  });

  it('should GET all lookup items', () => {
    const items = LookupTestUtilities.getFakeLookups(10);

    systemUnderTest.getList().subscribe((data: Lookup[]) => {
      expect(data.length).toBe(10);
    });

    const request: TestRequest = httpTestingController.expectOne('/api/lookup');
    expect(request.request.method).toEqual('GET');

    request.flush(items);
  });

  it('should return ApplicationError if get all lookup fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;

    systemUnderTest.getList().subscribe(
      (data: Lookup[]) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne('/api/lookup');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should run simple search for lookup via GET and return items', () => {
    const items = new SimpleSearchResults<Lookup>();
    items.currentPageValues = LookupTestUtilities.getFakeLookups(10);

    const searchString = 'asdf';

    systemUnderTest
      .search(searchString)
      .subscribe((data: SimpleSearchResults<Lookup>) => {
        expect(data.currentPageValues.length).toBe(10);
      });

    const request: TestRequest = httpTestingController.expectOne(
      `/api/lookup/simplesearch/${searchString}`
    );
    expect(request.request.method).toEqual('GET');

    request.flush(items);
  });

  it('should return ApplicationError if simple search for lookup fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const searchString = 'asdf';

    systemUnderTest.search(searchString).subscribe(
      (data: SimpleSearchResults<Lookup>) =>
        fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      `/api/lookup/simplesearch/${searchString}`
    );

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should GET one lookup item by id', () => {
    const item = LookupTestUtilities.getFakeLookup();

    systemUnderTest.getById(item.id).subscribe((data: Lookup | null) => {
      expect(data).toBe(item);
    });

    const request: TestRequest = httpTestingController.expectOne(
      `/api/lookup/${item.id}`
    );
    expect(request.request.method).toEqual('GET');

    request.flush(item);
  });

  it('should return ApplicationError if get lookup by id fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const expectedId = 12341234;

    systemUnderTest.getById(expectedId).subscribe(
      (data: Lookup | null) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      `/api/lookup/${expectedId}`
    );
    expect(request.request.method).toEqual('GET');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should DELETE one lookup item by id', () => {
    const item = LookupTestUtilities.getFakeLookup();

    systemUnderTest.deleteById(item.id).subscribe((data: Lookup) => {
      expect(data).toBe(item);
    });

    const request: TestRequest = httpTestingController.expectOne(
      `/api/lookup/${item.id}`
    );
    expect(request.request.method).toEqual('DELETE');

    request.flush(item);
  });

  it('should return ApplicationError if delete lookup by id fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const expectedId = 12341234;

    systemUnderTest.deleteById(expectedId).subscribe(
      (data: Lookup) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      `/api/lookup/${expectedId}`
    );
    expect(request.request.method).toEqual('DELETE');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should POST one lookup item when save lookup is called', () => {
    const item = LookupTestUtilities.getFakeLookup();

    systemUnderTest.save(item).subscribe((data: Lookup) => {
      expect(data).toBe(item);
    });

    const request: TestRequest = httpTestingController.expectOne('/api/lookup');
    expect(request.request.method).toEqual('POST');

    request.flush(item);
  });

  it('should return ApplicationError if save lookup fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const item = LookupTestUtilities.getFakeLookup();

    systemUnderTest.save(item).subscribe(
      (data: Lookup) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne('/api/lookup');
    expect(request.request.method).toEqual('POST');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });
  it('should GET all Lookup items by lookup type', () => {
    const items = LookupTestUtilities.getFakeLookups(10);

    const lookupType = 'type 1';

    systemUnderTest.getByType(lookupType).subscribe((data: Lookup[]) => {
      expect(data.length).toBe(10);
    });

    const request: TestRequest = httpTestingController.expectOne(
      `/api/lookup/bytype/${lookupType}`
    );
    expect(request.request.method).toEqual('GET');

    request.flush(items);
  });

  it('should return ApplicationError if get all Lookup items by type fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const lookupType = 'type 1';

    systemUnderTest.getByType(lookupType).subscribe(
      (data: Lookup[]) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      `/api/lookup/bytype/${lookupType}`
    );

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });
});
