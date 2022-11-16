import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Feedback } from '../_models/feedback';
import { catchError } from 'rxjs/operators';
import { ApplicationError } from '../_common/application-error';
import { CommonUtilities } from '../_common/common-utilities';
import { SimpleSearchResults } from '../_common/simple-search-results';
import { ApplicationConstants } from '../_common/application-constants';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  getList(): Observable<Feedback[]> {
    console.log(
      `Getting feedback list from the server ${this.baseUrl}api/feedback.`
    );
    return this.http
      .get<Feedback[]>('/api/feedback')
      .pipe(
        catchError((err) => CommonUtilities.handleHttpError<Feedback[]>(err))
      );
  }

  search(
    searchValue: string,
    pageNumber: string = ApplicationConstants.emptyValue,
    sortBy: string = ApplicationConstants.emptyValue,
    sortDirection: string = ApplicationConstants.emptyValue,
    maxNumberOfResults: number = -1
  ): Observable<SimpleSearchResults<Feedback>> {
    console.log(
      `Calling feedback search on the server for ${searchValue} at ${this.baseUrl}api/feedback/simplesearch/${searchValue}.`
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
      .get<SimpleSearchResults<Feedback>>(
        `/api/feedback/simplesearch/${searchValue}`,
        { params }
      )
      .pipe(
        catchError((err) =>
          CommonUtilities.handleHttpError<SimpleSearchResults<Feedback>>(err)
        )
      );
  }

  getById(id: number): Observable<Feedback | null> {
    console.log(
      `Getting feedback id ${id} from the server ${this.baseUrl}api/feedback/${id}.`
    );
    return this.http
      .get<Feedback>('/api/feedback/' + id.toString())
      .pipe(
        catchError((err) => CommonUtilities.handleHttpError<Feedback>(err))
      );
  }

  deleteById(id: number): Observable<any> {
    console.log(
      `Deleting feedback id ${id} from the server ${this.baseUrl}api/feedback/${id}.`
    );
    return this.http
      .delete('/api/feedback/' + id.toString())
      .pipe(catchError((err) => CommonUtilities.handleHttpError<any>(err)));
  }

  save(saveThis: Feedback): Observable<Feedback> {
    console.log(`Saving feedback to the server ${this.baseUrl}api/feedback.`);
    return this.http
      .post<Feedback>('/api/feedback', saveThis)
      .pipe(
        catchError((err) => CommonUtilities.handleHttpError<Feedback>(err))
      );
  }
}
