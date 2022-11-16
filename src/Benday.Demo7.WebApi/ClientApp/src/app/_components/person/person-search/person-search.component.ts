import { Component, Input, OnInit } from '@angular/core';
import { PersonService } from '../../../_services/person.service';
import { Observable } from 'rxjs';
import { Person } from '../../../_models/person';
import { Router } from '@angular/router';
import { ApplicationError } from 'src/app/_common/application-error';
import { NgForm } from '@angular/forms';
import { ApplicationConstants } from 'src/app/_common/application-constants';
import { SimpleSearchResults } from 'src/app/_common/simple-search-results';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css'],
})
export class PersonSearchComponent implements OnInit {
  public searchValue: string = ApplicationConstants.emptySearchValue;
  public items: SimpleSearchResults<Person> = new SimpleSearchResults<Person>();
  @Input() public autoLoad = true;
  @Input() public hideCreate = false;
  public message: string = ApplicationConstants.emptyMessage;

  constructor(private service: PersonService, private router: Router) {}

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
        (data: SimpleSearchResults<Person>) => {
          this.handleSearchResults(data);
        },
        (error: ApplicationError) => (this.message = error.friendlyMessage)
      );
    } else {
      this.items = new SimpleSearchResults<Person>();
      this.message = ApplicationConstants.emptyMessage;
    }
  }

  rowClicked(event: MouseEvent, item: Person) {
    this.router.navigate(['/person/person-details/' + item.id]);
  }

  search(searchForm: NgForm) {
    this.service.search(this.searchValue).subscribe(
      (data: SimpleSearchResults<Person>) => {
        this.handleSearchResults(data);
      },
      (error: ApplicationError) => (this.message = error.friendlyMessage)
    );
  }

  private handleSearchResults(data: SimpleSearchResults<Person>) {
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
        (data: SimpleSearchResults<Person>) => {
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
        (data: SimpleSearchResults<Person>) => {
          this.handleSearchResults(data);
        },
        (error: ApplicationError) => (this.message = error.friendlyMessage)
      );
  }
}
