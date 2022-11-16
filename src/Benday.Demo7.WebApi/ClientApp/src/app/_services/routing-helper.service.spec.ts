import { TestBed } from '@angular/core/testing';

import { RoutingHelperService } from './routing-helper.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('RoutingHelperService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 1 }),
            },
          },
        },
      ],
    })
  );

  it('should be created', () => {
    const service: RoutingHelperService = TestBed.get(RoutingHelperService);
    expect(service).toBeTruthy();
  });
});
