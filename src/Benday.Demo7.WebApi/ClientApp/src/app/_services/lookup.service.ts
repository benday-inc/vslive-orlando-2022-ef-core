import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Lookup } from '../_models/lookup';
import { catchError } from 'rxjs/operators';
import { ApplicationError } from '../_common/application-error';
import { CommonUtilities } from '../_common/common-utilities';
import { SimpleSearchResults } from '../_common/simple-search-results';
import { ApplicationConstants } from '../_common/application-constants';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  getList(): Observable<Lookup[]> {
    console.log(
      `Getting lookup list from the server ${this.baseUrl}api/lookup.`
    );
    return this.http
      .get<Lookup[]>('/api/lookup')
      .pipe(
        catchError((err) => CommonUtilities.handleHttpError<Lookup[]>(err))
      );
  }

  search(
    searchValue: string,
    pageNumber: string = ApplicationConstants.emptyValue,
    sortBy: string = ApplicationConstants.emptyValue,
    sortDirection: string = ApplicationConstants.emptyValue,
    maxNumberOfResults: number = -1
  ): Observable<SimpleSearchResults<Lookup>> {
    console.log(
      `Calling lookup search on the server for ${searchValue} at ${this.baseUrl}api/lookup/simplesearch/${searchValue}.`
    );

    let params = new HttpParams();

    if (pageNumber !== '') {
      params = params.set('pageNumber', pageNumber);
    }

    if (sortBy !== '') {
      params = params.set('sortBy', sortBy);
    }

    if (sortDirection !== '') {
      params = params.set('sortDirection', sortDirection);
    }

    if (maxNumberOfResults !== -1) {
      params = params.set('maxNumberOfResults', maxNumberOfResults);
    }

    return this.http
      .get<SimpleSearchResults<Lookup>>(
        `/api/lookup/simplesearch/${searchValue}`,
        { params }
      )
      .pipe(
        catchError((err) =>
          CommonUtilities.handleHttpError<SimpleSearchResults<Lookup>>(err)
        )
      );
  }

  getById(id: number): Observable<Lookup | null> {
    console.log(
      `Getting lookup id ${id} from the server ${this.baseUrl}api/lookup/${id}.`
    );
    return this.http
      .get<Lookup>('/api/lookup/' + id.toString())
      .pipe(catchError((err) => CommonUtilities.handleHttpError<Lookup>(err)));
  }

  deleteById(id: number): Observable<any> {
    console.log(
      `Deleting lookup id ${id} from the server ${this.baseUrl}api/lookup/${id}.`
    );
    return this.http
      .delete('/api/lookup/' + id.toString())
      .pipe(catchError((err) => CommonUtilities.handleHttpError<any>(err)));
  }

  save(saveThis: Lookup): Observable<Lookup> {
    console.log(`Saving lookup to the server ${this.baseUrl}api/lookup.`);
    return this.http
      .post<Lookup>('/api/lookup', saveThis)
      .pipe(catchError((err) => CommonUtilities.handleHttpError<Lookup>(err)));
  }
  getByType(lookupType: string): Observable<Lookup[]> {
    console.log(
      `Getting lookup list by type \'${lookupType}\' from the server ${this.baseUrl}api/lookup/bytype/${lookupType}.`
    );
    return this.http
      .get<Lookup[]>(`/api/lookup/bytype/${lookupType}`)
      .pipe(
        catchError((err) => CommonUtilities.handleHttpError<Lookup[]>(err))
      );
  }
}
