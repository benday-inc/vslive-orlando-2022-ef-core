import { TestBed } from '@angular/core/testing';
import { FeedbackService } from './feedback.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { Feedback } from '../_models/feedback';
import { FeedbackTestUtilities } from '../_models/feedback-test-utilities';
import { ApplicationError } from '../_common/application-error';
import { TestUtilities } from '../_common/test-utilities';
import { SimpleSearchResults } from '../_common/simple-search-results';

describe('FeedbackService', () => {
  let systemUnderTest: FeedbackService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: 'BASE_URL',
          useValue: TestUtilities.baseUrl,
        },
        FeedbackService,
      ],
    });

    systemUnderTest = TestBed.get(FeedbackService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(systemUnderTest).toBeTruthy();
  });

  it('should GET all feedback items', () => {
    const items = FeedbackTestUtilities.getFakeFeedbacks(10);

    systemUnderTest.getList().subscribe((data: Feedback[]) => {
      expect(data.length).toBe(10);
    });

    const request: TestRequest =
      httpTestingController.expectOne('/api/feedback');
    expect(request.request.method).toEqual('GET');

    request.flush(items);
  });

  it('should return ApplicationError if get all feedback fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;

    systemUnderTest.getList().subscribe(
      (data: Feedback[]) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest =
      httpTestingController.expectOne('/api/feedback');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should run simple search for feedback via GET and return items', () => {
    const items = new SimpleSearchResults<Feedback>();
    items.currentPageValues = FeedbackTestUtilities.getFakeFeedbacks(10);

    const searchString = 'asdf';

    systemUnderTest
      .search(searchString)
      .subscribe((data: SimpleSearchResults<Feedback>) => {
        expect(data.currentPageValues.length).toBe(10);
      });

    const request: TestRequest = httpTestingController.expectOne(
      `/api/feedback/simplesearch/${searchString}`
    );
    expect(request.request.method).toEqual('GET');

    request.flush(items);
  });

  it('should return ApplicationError if simple search for feedback fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const searchString = 'asdf';

    systemUnderTest.search(searchString).subscribe(
      (data: SimpleSearchResults<Feedback>) =>
        fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      `/api/feedback/simplesearch/${searchString}`
    );

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should GET one feedback item by id', () => {
    const item = FeedbackTestUtilities.getFakeFeedback();

    systemUnderTest.getById(item.id).subscribe((data: Feedback | null) => {
      expect(data).toBe(item);
    });

    const request: TestRequest = httpTestingController.expectOne(
      `/api/feedback/${item.id}`
    );
    expect(request.request.method).toEqual('GET');

    request.flush(item);
  });

  it('should return ApplicationError if get feedback by id fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const expectedId = 12341234;

    systemUnderTest.getById(expectedId).subscribe(
      (data: Feedback | null) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      `/api/feedback/${expectedId}`
    );
    expect(request.request.method).toEqual('GET');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should DELETE one feedback item by id', () => {
    const item = FeedbackTestUtilities.getFakeFeedback();

    systemUnderTest.deleteById(item.id).subscribe((data: Feedback) => {
      expect(data).toBe(item);
    });

    const request: TestRequest = httpTestingController.expectOne(
      `/api/feedback/${item.id}`
    );
    expect(request.request.method).toEqual('DELETE');

    request.flush(item);
  });

  it('should return ApplicationError if delete feedback by id fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const expectedId = 12341234;

    systemUnderTest.deleteById(expectedId).subscribe(
      (data: Feedback) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      `/api/feedback/${expectedId}`
    );
    expect(request.request.method).toEqual('DELETE');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should POST one feedback item when save feedback is called', () => {
    const item = FeedbackTestUtilities.getFakeFeedback();

    systemUnderTest.save(item).subscribe((data: Feedback) => {
      expect(data).toBe(item);
    });

    const request: TestRequest =
      httpTestingController.expectOne('/api/feedback');
    expect(request.request.method).toEqual('POST');

    request.flush(item);
  });

  it('should return ApplicationError if save feedback fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const item = FeedbackTestUtilities.getFakeFeedback();

    systemUnderTest.save(item).subscribe(
      (data: Feedback) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest =
      httpTestingController.expectOne('/api/feedback');
    expect(request.request.method).toEqual('POST');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });
});
