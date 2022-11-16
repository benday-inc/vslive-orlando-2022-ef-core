import { ApplicationConstants } from './application-constants';

export class SimpleSearchResults<T> {
  simpleSearchValue: string = ApplicationConstants.emptySearchValue;
  currentSortProperty: string = ApplicationConstants.emptyValue;
  currentSortDirection: string = ApplicationConstants.emptyValue;
  totalCount: number = 0;
  itemsPerPage: number = 0;
  pageCount: number = 0;
  currentPage: number = 0;
  currentPageValues: T[] = [];
}
