import { TestBed } from '@angular/core/testing';
import { LogEntryService } from './log-entry.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { LogEntry } from '../_models/log-entry';
import { LogEntryTestUtilities } from '../_models/log-entry-test-utilities';
import { ApplicationError } from '../_common/application-error';
import { TestUtilities } from '../_common/test-utilities';
import { SimpleSearchResults } from '../_common/simple-search-results';

describe('LogEntryService', () => {
  let systemUnderTest: LogEntryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: 'BASE_URL',
          useValue: TestUtilities.baseUrl,
        },
        LogEntryService,
      ],
    });

    systemUnderTest = TestBed.get(LogEntryService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(systemUnderTest).toBeTruthy();
  });

  it('should GET all log entries items', () => {
    const items = LogEntryTestUtilities.getFakeLogEntrys(10);

    systemUnderTest.getList().subscribe((data: LogEntry[]) => {
      expect(data.length).toBe(10);
    });

    const request: TestRequest =
      httpTestingController.expectOne('/api/logentry');
    expect(request.request.method).toEqual('GET');

    request.flush(items);
  });

  it('should return ApplicationError if get all log entries fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;

    systemUnderTest.getList().subscribe(
      (data: LogEntry[]) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest =
      httpTestingController.expectOne('/api/logentry');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should run simple search for log entries via GET and return items', () => {
    const items = new SimpleSearchResults<LogEntry>();
    items.currentPageValues = LogEntryTestUtilities.getFakeLogEntrys(10);

    const searchString = 'asdf';

    systemUnderTest
      .search(searchString)
      .subscribe((data: SimpleSearchResults<LogEntry>) => {
        expect(data.currentPageValues.length).toBe(10);
      });

    const request: TestRequest = httpTestingController.expectOne(
      `/api/logentry/simplesearch/${searchString}`
    );
    expect(request.request.method).toEqual('GET');

    request.flush(items);
  });

  it('should return ApplicationError if simple search for log entries fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const searchString = 'asdf';

    systemUnderTest.search(searchString).subscribe(
      (data: SimpleSearchResults<LogEntry>) =>
        fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      `/api/logentry/simplesearch/${searchString}`
    );

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should GET one log entries item by id', () => {
    const item = LogEntryTestUtilities.getFakeLogEntry();

    systemUnderTest.getById(item.id).subscribe((data: LogEntry | null) => {
      expect(data).toBe(item);
    });

    const request: TestRequest = httpTestingController.expectOne(
      `/api/logentry/${item.id}`
    );
    expect(request.request.method).toEqual('GET');

    request.flush(item);
  });

  it('should return ApplicationError if get log entries by id fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const expectedId = 12341234;

    systemUnderTest.getById(expectedId).subscribe(
      (data: LogEntry | null) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      `/api/logentry/${expectedId}`
    );
    expect(request.request.method).toEqual('GET');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should DELETE one log entries item by id', () => {
    const item = LogEntryTestUtilities.getFakeLogEntry();

    systemUnderTest.deleteById(item.id).subscribe((data: LogEntry) => {
      expect(data).toBe(item);
    });

    const request: TestRequest = httpTestingController.expectOne(
      `/api/logentry/${item.id}`
    );
    expect(request.request.method).toEqual('DELETE');

    request.flush(item);
  });

  it('should return ApplicationError if delete log entries by id fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const expectedId = 12341234;

    systemUnderTest.deleteById(expectedId).subscribe(
      (data: LogEntry) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      `/api/logentry/${expectedId}`
    );
    expect(request.request.method).toEqual('DELETE');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should POST one log entries item when save log entries is called', () => {
    const item = LogEntryTestUtilities.getFakeLogEntry();

    systemUnderTest.save(item).subscribe((data: LogEntry) => {
      expect(data).toBe(item);
    });

    const request: TestRequest =
      httpTestingController.expectOne('/api/logentry');
    expect(request.request.method).toEqual('POST');

    request.flush(item);
  });

  it('should return ApplicationError if save log entries fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const item = LogEntryTestUtilities.getFakeLogEntry();

    systemUnderTest.save(item).subscribe(
      (data: LogEntry) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest =
      httpTestingController.expectOne('/api/logentry');
    expect(request.request.method).toEqual('POST');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });
});
