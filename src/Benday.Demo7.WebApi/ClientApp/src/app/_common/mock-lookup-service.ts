import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Lookup } from '../_models/lookup';
import { LookupTestUtilities } from '../_models/lookup-test-utilities';
import { LookupService } from '../_services/lookup.service';

export class MockLookupService extends LookupService {
  // constructor(
  //   http: HttpClient,
  //   baseUrl: string
  // ) {
  //   super(http, baseUrl);
  // }

  getList(): Observable<Lookup[]> {
    return of(LookupTestUtilities.getFakeLookups(10));
  }

  getByType(lookupType: string): Observable<Lookup[]> {
    return of(LookupTestUtilities.getFakeLookups(10));
  }
}
