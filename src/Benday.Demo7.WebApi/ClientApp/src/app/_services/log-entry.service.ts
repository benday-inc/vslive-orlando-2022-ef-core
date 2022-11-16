import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LogEntry } from '../_models/log-entry';
import { catchError } from 'rxjs/operators';
import { ApplicationError } from '../_common/application-error';
import { CommonUtilities } from '../_common/common-utilities';
import { SimpleSearchResults } from '../_common/simple-search-results';
import { ApplicationConstants } from '../_common/application-constants';

@Injectable({
  providedIn: 'root',
})
export class LogEntryService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  getList(): Observable<LogEntry[]> {
    console.log(
      `Getting log entries list from the server ${this.baseUrl}api/logentry.`
    );
    return this.http
      .get<LogEntry[]>('/api/logentry')
      .pipe(
        catchError((err) => CommonUtilities.handleHttpError<LogEntry[]>(err))
      );
  }

  search(
    searchValue: string,
    pageNumber: string = ApplicationConstants.emptyValue,
    sortBy: string = ApplicationConstants.emptyValue,
    sortDirection: string = ApplicationConstants.emptyValue,
    maxNumberOfResults: number = -1
  ): Observable<SimpleSearchResults<LogEntry>> {
    console.log(
      `Calling log entries search on the server for ${searchValue} at ${this.baseUrl}api/logentry/simplesearch/${searchValue}.`
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
      .get<SimpleSearchResults<LogEntry>>(
        `/api/logentry/simplesearch/${searchValue}`,
        { params }
      )
      .pipe(
        catchError((err) =>
          CommonUtilities.handleHttpError<SimpleSearchResults<LogEntry>>(err)
        )
      );
  }

  getById(id: number): Observable<LogEntry | null> {
    console.log(
      `Getting log entries id ${id} from the server ${this.baseUrl}api/logentry/${id}.`
    );
    return this.http
      .get<LogEntry>('/api/logentry/' + id.toString())
      .pipe(
        catchError((err) => CommonUtilities.handleHttpError<LogEntry>(err))
      );
  }

  deleteById(id: number): Observable<any> {
    console.log(
      `Deleting log entries id ${id} from the server ${this.baseUrl}api/logentry/${id}.`
    );
    return this.http
      .delete('/api/logentry/' + id.toString())
      .pipe(catchError((err) => CommonUtilities.handleHttpError<any>(err)));
  }

  save(saveThis: LogEntry): Observable<LogEntry> {
    console.log(
      `Saving log entries to the server ${this.baseUrl}api/logentry.`
    );
    return this.http
      .post<LogEntry>('/api/logentry', saveThis)
      .pipe(
        catchError((err) => CommonUtilities.handleHttpError<LogEntry>(err))
      );
  }
}
