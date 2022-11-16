import { TestBed } from '@angular/core/testing';
import { ConfigurationItemService } from './configuration-item.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { ConfigurationItem } from '../_models/configuration-item';
import { ConfigurationItemTestUtilities } from '../_models/configuration-item-test-utilities';
import { ApplicationError } from '../_common/application-error';
import { TestUtilities } from '../_common/test-utilities';
import { SimpleSearchResults } from '../_common/simple-search-results';

describe('ConfigurationItemService', () => {
  let systemUnderTest: ConfigurationItemService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: 'BASE_URL',
          useValue: TestUtilities.baseUrl,
        },
        ConfigurationItemService,
      ],
    });

    systemUnderTest = TestBed.get(ConfigurationItemService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(systemUnderTest).toBeTruthy();
  });

  it('should GET all configuration item items', () => {
    const items = ConfigurationItemTestUtilities.getFakeConfigurationItems(10);

    systemUnderTest.getList().subscribe((data: ConfigurationItem[]) => {
      expect(data.length).toBe(10);
    });

    const request: TestRequest = httpTestingController.expectOne(
      '/api/configurationitem'
    );
    expect(request.request.method).toEqual('GET');

    request.flush(items);
  });

  it('should return ApplicationError if get all configuration item fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;

    systemUnderTest.getList().subscribe(
      (data: ConfigurationItem[]) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      '/api/configurationitem'
    );

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should run simple search for configuration item via GET and return items', () => {
    const items = new SimpleSearchResults<ConfigurationItem>();
    items.currentPageValues =
      ConfigurationItemTestUtilities.getFakeConfigurationItems(10);

    const searchString = 'asdf';

    systemUnderTest
      .search(searchString)
      .subscribe((data: SimpleSearchResults<ConfigurationItem>) => {
        expect(data.currentPageValues.length).toBe(10);
      });

    const request: TestRequest = httpTestingController.expectOne(
      `/api/configurationitem/simplesearch/${searchString}`
    );
    expect(request.request.method).toEqual('GET');

    request.flush(items);
  });

  it('should return ApplicationError if simple search for configuration item fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const searchString = 'asdf';

    systemUnderTest.search(searchString).subscribe(
      (data: SimpleSearchResults<ConfigurationItem>) =>
        fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      `/api/configurationitem/simplesearch/${searchString}`
    );

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should GET one configuration item item by id', () => {
    const item = ConfigurationItemTestUtilities.getFakeConfigurationItem();

    systemUnderTest
      .getById(item.id)
      .subscribe((data: ConfigurationItem | null) => {
        expect(data).toBe(item);
      });

    const request: TestRequest = httpTestingController.expectOne(
      `/api/configurationitem/${item.id}`
    );
    expect(request.request.method).toEqual('GET');

    request.flush(item);
  });

  it('should return ApplicationError if get configuration item by id fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const expectedId = 12341234;

    systemUnderTest.getById(expectedId).subscribe(
      (data: ConfigurationItem | null) =>
        fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      `/api/configurationitem/${expectedId}`
    );
    expect(request.request.method).toEqual('GET');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should DELETE one configuration item item by id', () => {
    const item = ConfigurationItemTestUtilities.getFakeConfigurationItem();

    systemUnderTest.deleteById(item.id).subscribe((data: ConfigurationItem) => {
      expect(data).toBe(item);
    });

    const request: TestRequest = httpTestingController.expectOne(
      `/api/configurationitem/${item.id}`
    );
    expect(request.request.method).toEqual('DELETE');

    request.flush(item);
  });

  it('should return ApplicationError if delete configuration item by id fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const expectedId = 12341234;

    systemUnderTest.deleteById(expectedId).subscribe(
      (data: ConfigurationItem) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      `/api/configurationitem/${expectedId}`
    );
    expect(request.request.method).toEqual('DELETE');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });

  it('should POST one configuration item item when save configuration item is called', () => {
    const item = ConfigurationItemTestUtilities.getFakeConfigurationItem();

    systemUnderTest.save(item).subscribe((data: ConfigurationItem) => {
      expect(data).toBe(item);
    });

    const request: TestRequest = httpTestingController.expectOne(
      '/api/configurationitem'
    );
    expect(request.request.method).toEqual('POST');

    request.flush(item);
  });

  it('should return ApplicationError if save configuration item fails', () => {
    const expectedErrorNumber = 500;
    const expectedErrorStatusText = 'Server Error';
    const expectedFriendlyErrorMessage = `Error retrieving data: ${expectedErrorStatusText}`;
    const item = ConfigurationItemTestUtilities.getFakeConfigurationItem();

    systemUnderTest.save(item).subscribe(
      (data: ConfigurationItem) => fail('this should have been an error'),
      (err: ApplicationError) => {
        expect(err.errorNumber).toEqual(expectedErrorNumber);
        expect(err.friendlyMessage).toEqual(expectedFriendlyErrorMessage);
      }
    );

    const request: TestRequest = httpTestingController.expectOne(
      '/api/configurationitem'
    );
    expect(request.request.method).toEqual('POST');

    request.flush('error', {
      status: expectedErrorNumber,
      statusText: expectedErrorStatusText,
    });
  });
});
