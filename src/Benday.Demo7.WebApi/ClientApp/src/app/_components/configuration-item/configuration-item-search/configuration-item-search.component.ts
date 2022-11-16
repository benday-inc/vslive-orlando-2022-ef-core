import { Component, Input, OnInit } from '@angular/core';
import { ConfigurationItemService } from '../../../_services/configuration-item.service';
import { Observable } from 'rxjs';
import { ConfigurationItem } from '../../../_models/configuration-item';
import { Router } from '@angular/router';
import { ApplicationError } from 'src/app/_common/application-error';
import { NgForm } from '@angular/forms';
import { ApplicationConstants } from 'src/app/_common/application-constants';
import { SimpleSearchResults } from 'src/app/_common/simple-search-results';

@Component({
  selector: 'app-configuration-item-search',
  templateUrl: './configuration-item-search.component.html',
  styleUrls: ['./configuration-item-search.component.css'],
})
export class ConfigurationItemSearchComponent implements OnInit {
  public searchValue: string = ApplicationConstants.emptySearchValue;
  public items: SimpleSearchResults<ConfigurationItem> =
    new SimpleSearchResults<ConfigurationItem>();
  @Input() public autoLoad = true;
  @Input() public hideCreate = false;
  public message: string = ApplicationConstants.emptyMessage;

  constructor(
    private service: ConfigurationItemService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  reset() {
    this.message = ApplicationConstants.emptyMessage;
    this.searchValue = ApplicationConstants.emptySearchValue;
    this.load();
  }

  load() {
    if (this.autoLoad === true) {
      this.service.search(ApplicationConstants.emptySearchValue).subscribe(
        (data: SimpleSearchResults<ConfigurationItem>) => {
          this.handleSearchResults(data);
        },
        (error: ApplicationError) => (this.message = error.friendlyMessage)
      );
    } else {
      this.items = new SimpleSearchResults<ConfigurationItem>();
      this.message = ApplicationConstants.emptyMessage;
    }
  }

  rowClicked(event: MouseEvent, item: ConfigurationItem) {
    this.router.navigate([
      '/configuration-item/configuration-item-details/' + item.id,
    ]);
  }

  search(searchForm: NgForm) {
    this.service.search(this.searchValue).subscribe(
      (data: SimpleSearchResults<ConfigurationItem>) => {
        this.handleSearchResults(data);
      },
      (error: ApplicationError) => (this.message = error.friendlyMessage)
    );
  }

  private handleSearchResults(data: SimpleSearchResults<ConfigurationItem>) {
    this.items = data;

    if (data === null || data.currentPageValues.length === 0) {
      this.message = ApplicationConstants.noDataMessage;
    } else {
      this.message = ApplicationConstants.emptyMessage;
    }
  }

  getLoopArray(size: number) {
    return new Array(size);
  }

  sortBy(sortBy: string) {
    console.log(`sort by: ${sortBy}...`);

    let sortDirection = ApplicationConstants.sortDirectionAscending;

    if (this.items.currentSortProperty === sortBy) {
      // change sort direction
      if (
        this.items.currentSortDirection ===
        ApplicationConstants.sortDirectionAscending
      ) {
        sortDirection = ApplicationConstants.sortDirectionDescending;
      } else {
        sortDirection = ApplicationConstants.sortDirectionAscending;
      }
    } else {
      // different sortBy --> reset to ascending
      sortDirection = ApplicationConstants.sortDirectionAscending;
    }

    this.service
      .search(
        this.searchValue,
        this.items.currentPage.toString(),
        sortBy,
        sortDirection
      )
      .subscribe(
        (data: SimpleSearchResults<ConfigurationItem>) => {
          this.handleSearchResults(data);
        },
        (error: ApplicationError) => (this.message = error.friendlyMessage)
      );
  }

  changePage(pageNumber: number) {
    console.log(`change page to ${pageNumber}...`);

    this.service
      .search(
        this.searchValue,
        pageNumber.toString(),
        this.items.currentSortProperty,
        this.items.currentSortDirection
      )
      .subscribe(
        (data: SimpleSearchResults<ConfigurationItem>) => {
          this.handleSearchResults(data);
        },
        (error: ApplicationError) => (this.message = error.friendlyMessage)
      );
  }
}
