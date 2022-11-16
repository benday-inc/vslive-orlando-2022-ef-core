import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Person } from '../_models/person';
import { catchError } from 'rxjs/operators';
import { ApplicationError } from '../_common/application-error';
import { CommonUtilities } from '../_common/common-utilities';
import { SimpleSearchResults } from '../_common/simple-search-results';
import { ApplicationConstants } from '../_common/application-constants';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  getList(): Observable<Person[]> {
    console.log(
      `Getting Person list from the server ${this.baseUrl}api/person.`
    );
    return this.http
      .get<Person[]>('/api/person')
      .pipe(
        catchError((err) => CommonUtilities.handleHttpError<Person[]>(err))
      );
  }

  search(
    searchValue: string,
    pageNumber: string = ApplicationConstants.emptyValue,
    sortBy: string = ApplicationConstants.emptyValue,
    sortDirection: string = ApplicationConstants.emptyValue,
    maxNumberOfResults: number = -1
  ): Observable<SimpleSearchResults<Person>> {
    console.log(
      `Calling Person search on the server for ${searchValue} at ${this.baseUrl}api/person/simplesearch/${searchValue}.`
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
      .get<SimpleSearchResults<Person>>(
        `/api/person/simplesearch/${searchValue}`,
        { params }
      )
      .pipe(
        catchError((err) =>
          CommonUtilities.handleHttpError<SimpleSearchResults<Person>>(err)
        )
      );
  }

  getById(id: number): Observable<Person | null> {
    console.log(
      `Getting Person id ${id} from the server ${this.baseUrl}api/person/${id}.`
    );
    return this.http
      .get<Person>('/api/person/' + id.toString())
      .pipe(catchError((err) => CommonUtilities.handleHttpError<Person>(err)));
  }

  deleteById(id: number): Observable<any> {
    console.log(
      `Deleting Person id ${id} from the server ${this.baseUrl}api/person/${id}.`
    );
    return this.http
      .delete('/api/person/' + id.toString())
      .pipe(catchError((err) => CommonUtilities.handleHttpError<any>(err)));
  }

  save(saveThis: Person): Observable<Person> {
    console.log(`Saving Person to the server ${this.baseUrl}api/person.`);
    return this.http
      .post<Person>('/api/person', saveThis)
      .pipe(catchError((err) => CommonUtilities.handleHttpError<Person>(err)));
  }
}
