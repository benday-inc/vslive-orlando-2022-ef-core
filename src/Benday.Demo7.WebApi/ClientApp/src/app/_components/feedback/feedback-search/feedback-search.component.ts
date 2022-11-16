import { Component, Input, OnInit } from '@angular/core';
import { FeedbackService } from '../../../_services/feedback.service';
import { Observable } from 'rxjs';
import { Feedback } from '../../../_models/feedback';
import { Router } from '@angular/router';
import { ApplicationError } from 'src/app/_common/application-error';
import { NgForm } from '@angular/forms';
import { ApplicationConstants } from 'src/app/_common/application-constants';
import { SimpleSearchResults } from 'src/app/_common/simple-search-results';

@Component({
  selector: 'app-feedback-search',
  templateUrl: './feedback-search.component.html',
  styleUrls: ['./feedback-search.component.css'],
})
export class FeedbackSearchComponent implements OnInit {
  public searchValue: string = ApplicationConstants.emptySearchValue;
  public items: SimpleSearchResults<Feedback> =
    new SimpleSearchResults<Feedback>();
  @Input() public autoLoad = true;
  @Input() public hideCreate = false;
  public message: string = ApplicationConstants.emptyMessage;

  constructor(private service: FeedbackService, private router: Router) {}

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
        (data: SimpleSearchResults<Feedback>) => {
          this.handleSearchResults(data);
        },
        (error: ApplicationError) => (this.message = error.friendlyMessage)
      );
    } else {
      this.items = new SimpleSearchResults<Feedback>();
      this.message = ApplicationConstants.emptyMessage;
    }
  }

  rowClicked(event: MouseEvent, item: Feedback) {
    this.router.navigate(['/feedback/feedback-details/' + item.id]);
  }

  search(searchForm: NgForm) {
    this.service.search(this.searchValue).subscribe(
      (data: SimpleSearchResults<Feedback>) => {
        this.handleSearchResults(data);
      },
      (error: ApplicationError) => (this.message = error.friendlyMessage)
    );
  }

  private handleSearchResults(data: SimpleSearchResults<Feedback>) {
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
        (data: SimpleSearchResults<Feedback>) => {
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
        (data: SimpleSearchResults<Feedback>) => {
          this.handleSearchResults(data);
        },
        (error: ApplicationError) => (this.message = error.friendlyMessage)
      );
  }
}
