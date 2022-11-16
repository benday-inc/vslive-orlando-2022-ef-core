import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserClaim } from '../_models/user-claim';
import { catchError } from 'rxjs/operators';
import { ApplicationError } from '../_common/application-error';
import { CommonUtilities } from '../_common/common-utilities';
import { SimpleSearchResults } from '../_common/simple-search-results';
import { ApplicationConstants } from '../_common/application-constants';

@Injectable({
  providedIn: 'root',
})
export class UserClaimService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  getList(): Observable<UserClaim[]> {
    console.log(
      `Getting user claim list from the server ${this.baseUrl}api/userclaim.`
    );
    return this.http
      .get<UserClaim[]>('/api/userclaim')
      .pipe(
        catchError((err) => CommonUtilities.handleHttpError<UserClaim[]>(err))
      );
  }

  search(
    searchValue: string,
    pageNumber: string = ApplicationConstants.emptyValue,
    sortBy: string = ApplicationConstants.emptyValue,
    sortDirection: string = ApplicationConstants.emptyValue,
    maxNumberOfResults: number = -1
  ): Observable<SimpleSearchResults<UserClaim>> {
    console.log(
      `Calling user claim search on the server for ${searchValue} at ${this.baseUrl}api/userclaim/simplesearch/${searchValue}.`
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
      .get<SimpleSearchResults<UserClaim>>(
        `/api/userclaim/simplesearch/${searchValue}`,
        { params }
      )
      .pipe(
        catchError((err) =>
          CommonUtilities.handleHttpError<SimpleSearchResults<UserClaim>>(err)
        )
      );
  }

  getById(id: number): Observable<UserClaim | null> {
    console.log(
      `Getting user claim id ${id} from the server ${this.baseUrl}api/userclaim/${id}.`
    );
    return this.http
      .get<UserClaim>('/api/userclaim/' + id.toString())
      .pipe(
        catchError((err) => CommonUtilities.handleHttpError<UserClaim>(err))
      );
  }

  deleteById(id: number): Observable<any> {
    console.log(
      `Deleting user claim id ${id} from the server ${this.baseUrl}api/userclaim/${id}.`
    );
    return this.http
      .delete('/api/userclaim/' + id.toString())
      .pipe(catchError((err) => CommonUtilities.handleHttpError<any>(err)));
  }

  save(saveThis: UserClaim): Observable<UserClaim> {
    console.log(
      `Saving user claim to the server ${this.baseUrl}api/userclaim.`
    );
    return this.http
      .post<UserClaim>('/api/userclaim', saveThis)
      .pipe(
        catchError((err) => CommonUtilities.handleHttpError<UserClaim>(err))
      );
  }
}
