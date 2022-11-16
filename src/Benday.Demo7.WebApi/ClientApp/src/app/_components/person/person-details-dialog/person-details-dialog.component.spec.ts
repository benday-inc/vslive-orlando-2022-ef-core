import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RoutingHelperService } from '../../../_services/routing-helper.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
import {
  MatDialogConfig,
  MatDialogModule,
  MatDialogTitle,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { PersonDetailsDialogComponent } from './person-details-dialog.component';
import { PersonService } from '../../../_services/person.service';
import { Person } from '../../../_models/person';
import { ApplicationError } from 'src/app/_common/application-error';
import { PersonTestUtilities } from 'src/app/_models/person-test-utilities';
import { LookupDropdownControlComponent } from '../../lookup-dropdown-control/lookup-dropdown-control.component';
import { MockRoutingHelperService } from 'src/app/_common/mock-routing-helper-service';
import { LookupService } from 'src/app/_services/lookup.service';
import { Lookup } from 'src/app/_models/lookup';
import { LookupTestUtilities } from 'src/app/_models/lookup-test-utilities';
import { ApplicationConstants } from 'src/app/_common/application-constants';
import { TestUtilities } from 'src/app/_common/test-utilities';

describe('PersonDetailsDialogComponent', () => {
  let systemUnderTest: PersonDetailsDialogComponent;
  let fixture: ComponentFixture<PersonDetailsDialogComponent>;
  let routingHelper: MockRoutingHelperService;
  let formValiditySpy: jasmine.Spy<jasmine.Func> | null = null;
  let model: ClassProperty;
  let dialogData: MatDialogConfig<ClassProperty> =
    new MatDialogConfig<ClassProperty>();
  const expectedDefaultErrorMessage = 'BOOM!';
  const expectedDefaultErrorFormattedMessage =
    'An error occurred.  999 - BOOM! - BOOM!';

  afterEach(() => {
    formValiditySpy = null;
  });

  beforeEach(waitForAsync(() => {
    routingHelper = new MockRoutingHelperService();
    model = PersonTestUtilities.getFakePerson();
    dialogData.data = model;

    TestBed.configureTestingModule({
      declarations: [
        PersonDetailsDialogComponent,
        LookupDropdownControlComponent,
      ],
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
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: model,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetailsDialogComponent);
    systemUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(systemUnderTest).toBeTruthy();
  });

  it('should have a form control for FirstName', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.firstName,
      systemUnderTest.theForm.get(systemUnderTest.fieldNamePersonFirstName)
    );
  });
  it('should have a form control for LastName', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.lastName,
      systemUnderTest.theForm.get(systemUnderTest.fieldNamePersonLastName)
    );
  });
  it('should have a form control for EmailAddress', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.emailAddress,
      systemUnderTest.theForm.get(systemUnderTest.fieldNamePersonEmailAddress)
    );
  });
  it('should have a form control for Id', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.id,
      systemUnderTest.theForm.get(systemUnderTest.fieldNamePersonId)
    );
  });
  it('should have a form control for Status', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.status,
      systemUnderTest.theForm.get(systemUnderTest.fieldNamePersonStatus)
    );
  });
  it('should have a form control for CreatedBy', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.createdBy,
      systemUnderTest.theForm.get(systemUnderTest.fieldNamePersonCreatedBy)
    );
  });
  it('should have a form control for CreatedDate', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.createdDate,
      systemUnderTest.theForm.get(systemUnderTest.fieldNamePersonCreatedDate)
    );
  });
  it('should have a form control for LastModifiedBy', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.lastModifiedBy,
      systemUnderTest.theForm.get(systemUnderTest.fieldNamePersonLastModifiedBy)
    );
  });
  it('should have a form control for LastModifiedDate', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.lastModifiedDate,
      systemUnderTest.theForm.get(
        systemUnderTest.fieldNamePersonLastModifiedDate
      )
    );
  });
  it('should have a form control for Timestamp', () => {
    systemUnderTest.ngOnInit();

    TestUtilities.assertFormControl(
      systemUnderTest.timestamp,
      systemUnderTest.theForm.get(systemUnderTest.fieldNamePersonTimestamp)
    );
  });
});
