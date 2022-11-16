import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigurationItemListComponent } from './configuration-item-list.component';
import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigurationItemService } from 'src/app/_services/configuration-item.service';
import { ApplicationError } from 'src/app/_common/application-error';
import { EMPTY, throwError, of } from 'rxjs';
import { ConfigurationItem } from 'src/app/_models/configuration-item';
import { ConfigurationItemTestUtilities } from 'src/app/_models/configuration-item-test-utilities';
import { ApplicationConstants } from 'src/app/_common/application-constants';
import { TestUtilities } from 'src/app/_common/test-utilities';

describe('ConfigurationItemListComponent', () => {
  let systemUnderTest: ConfigurationItemListComponent;
  let fixture: ComponentFixture<ConfigurationItemListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationItemListComponent],
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
    fixture = TestBed.createComponent(ConfigurationItemListComponent);
    systemUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(systemUnderTest).toBeTruthy();
  });

  it('should set an error message if call to service.getList() fails', () => {
    const service = fixture.debugElement.injector.get(ConfigurationItemService);

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

  it('should populate list of configuration item items on successful load', () => {
    const service = fixture.debugElement.injector.get(ConfigurationItemService);

    const serviceMethodSpy = spyOn(service, 'getList');

    const items = ConfigurationItemTestUtilities.getFakeConfigurationItems(10);

    serviceMethodSpy.and.returnValue(of(items));

    systemUnderTest.ngOnInit();

    expect(systemUnderTest).toBeTruthy();
    expect(serviceMethodSpy).toHaveBeenCalled();
    expect(systemUnderTest.message).toBe(ApplicationConstants.emptyMessage);
    expect(systemUnderTest.items).not.toBeNull();
    expect(systemUnderTest.items.length).toBe(10);
  });

  it('should not populate list of configuration item items automatically if autoload is false', () => {
    systemUnderTest.autoLoad = false;

    const service = fixture.debugElement.injector.get(ConfigurationItemService);

    const serviceMethodSpy = spyOn(service, 'getList');

    const items = ConfigurationItemTestUtilities.getFakeConfigurationItems(10);

    serviceMethodSpy.and.returnValue(of(items));

    systemUnderTest.ngOnInit();

    expect(systemUnderTest).toBeTruthy();
    expect(serviceMethodSpy).not.toHaveBeenCalled();
    expect(systemUnderTest.message).toBe(ApplicationConstants.emptyMessage);
    expect(systemUnderTest.items).not.toBeNull();
    expect(systemUnderTest.items.length).toBe(0);
  });

  it('should set message to no data when result array has zero items', () => {
    const service = fixture.debugElement.injector.get(ConfigurationItemService);

    const serviceMethodSpy = spyOn(service, 'getList');
    serviceMethodSpy.and.returnValue(of(new Array<ConfigurationItem>(0)));

    systemUnderTest.ngOnInit();

    expect(serviceMethodSpy).toHaveBeenCalled();

    expect(systemUnderTest).toBeTruthy();

    expect(systemUnderTest.message).not.toBeNull();

    expect(systemUnderTest.message).toBe(ApplicationConstants.noDataMessage);
  });
});
