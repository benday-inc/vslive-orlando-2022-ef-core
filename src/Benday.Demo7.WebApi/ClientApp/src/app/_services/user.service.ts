import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../_models/user';
import { catchError } from 'rxjs/operators';
import { ApplicationError } from '../_common/application-error';
import { CommonUtilities } from '../_common/common-utilities';
import { SimpleSearchResults } from '../_common/simple-search-results';
import { ApplicationConstants } from '../_common/application-constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  getList(): Observable<User[]> {
    console.log(`Getting user list from the server ${this.baseUrl}api/user.`);
    return this.http
      .get<User[]>('/api/user')
      .pipe(catchError((err) => CommonUtilities.handleHttpError<User[]>(err)));
  }

  search(
    searchValue: string,
    pageNumber: string = ApplicationConstants.emptyValue,
    sortBy: string = ApplicationConstants.emptyValue,
    sortDirection: string = ApplicationConstants.emptyValue,
    maxNumberOfResults: number = -1
  ): Observable<SimpleSearchResults<User>> {
    console.log(
      `Calling user search on the server for ${searchValue} at ${this.baseUrl}api/user/simplesearch/${searchValue}.`
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
      .get<SimpleSearchResults<User>>(`/api/user/simplesearch/${searchValue}`, {
        params,
      })
      .pipe(
        catchError((err) =>
          CommonUtilities.handleHttpError<SimpleSearchResults<User>>(err)
        )
      );
  }

  getById(id: number): Observable<User | null> {
    console.log(
      `Getting user id ${id} from the server ${this.baseUrl}api/user/${id}.`
    );
    return this.http
      .get<User>('/api/user/' + id.toString())
      .pipe(catchError((err) => CommonUtilities.handleHttpError<User>(err)));
  }

  deleteById(id: number): Observable<any> {
    console.log(
      `Deleting user id ${id} from the server ${this.baseUrl}api/user/${id}.`
    );
    return this.http
      .delete('/api/user/' + id.toString())
      .pipe(catchError((err) => CommonUtilities.handleHttpError<any>(err)));
  }

  save(saveThis: User): Observable<User> {
    console.log(`Saving user to the server ${this.baseUrl}api/user.`);
    return this.http
      .post<User>('/api/user', saveThis)
      .pipe(catchError((err) => CommonUtilities.handleHttpError<User>(err)));
  }
}
