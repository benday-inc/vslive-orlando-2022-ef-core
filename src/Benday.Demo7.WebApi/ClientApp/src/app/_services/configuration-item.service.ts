import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigurationItem } from '../_models/configuration-item';
import { catchError } from 'rxjs/operators';
import { ApplicationError } from '../_common/application-error';
import { CommonUtilities } from '../_common/common-utilities';
import { SimpleSearchResults } from '../_common/simple-search-results';
import { ApplicationConstants } from '../_common/application-constants';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationItemService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  getList(): Observable<ConfigurationItem[]> {
    console.log(
      `Getting configuration item list from the server ${this.baseUrl}api/configurationitem.`
    );
    return this.http
      .get<ConfigurationItem[]>('/api/configurationitem')
      .pipe(
        catchError((err) =>
          CommonUtilities.handleHttpError<ConfigurationItem[]>(err)
        )
      );
  }

  search(
    searchValue: string,
    pageNumber: string = ApplicationConstants.emptyValue,
    sortBy: string = ApplicationConstants.emptyValue,
    sortDirection: string = ApplicationConstants.emptyValue,
    maxNumberOfResults: number = -1
  ): Observable<SimpleSearchResults<ConfigurationItem>> {
    console.log(
      `Calling configuration item search on the server for ${searchValue} at ${this.baseUrl}api/configurationitem/simplesearch/${searchValue}.`
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
      .get<SimpleSearchResults<ConfigurationItem>>(
        `/api/configurationitem/simplesearch/${searchValue}`,
        { params }
      )
      .pipe(
        catchError((err) =>
          CommonUtilities.handleHttpError<
            SimpleSearchResults<ConfigurationItem>
          >(err)
        )
      );
  }

  getById(id: number): Observable<ConfigurationItem | null> {
    console.log(
      `Getting configuration item id ${id} from the server ${this.baseUrl}api/configurationitem/${id}.`
    );
    return this.http
      .get<ConfigurationItem>('/api/configurationitem/' + id.toString())
      .pipe(
        catchError((err) =>
          CommonUtilities.handleHttpError<ConfigurationItem>(err)
        )
      );
  }

  deleteById(id: number): Observable<any> {
    console.log(
      `Deleting configuration item id ${id} from the server ${this.baseUrl}api/configurationitem/${id}.`
    );
    return this.http
      .delete('/api/configurationitem/' + id.toString())
      .pipe(catchError((err) => CommonUtilities.handleHttpError<any>(err)));
  }

  save(saveThis: ConfigurationItem): Observable<ConfigurationItem> {
    console.log(
      `Saving configuration item to the server ${this.baseUrl}api/configurationitem.`
    );
    return this.http
      .post<ConfigurationItem>('/api/configurationitem', saveThis)
      .pipe(
        catchError((err) =>
          CommonUtilities.handleHttpError<ConfigurationItem>(err)
        )
      );
  }
}
