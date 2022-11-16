import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LookupDropdownControlComponent } from './lookup-dropdown-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TestUtilities } from 'src/app/_common/test-utilities';

describe('LookupDropdownControlComponent', () => {
  let component: LookupDropdownControlComponent;
  let fixture: ComponentFixture<LookupDropdownControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LookupDropdownControlComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [
        {
          provide: 'BASE_URL',
          useValue: TestUtilities.baseUrl,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupDropdownControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
