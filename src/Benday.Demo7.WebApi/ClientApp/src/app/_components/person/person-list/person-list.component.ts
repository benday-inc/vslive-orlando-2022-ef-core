import { Component, OnInit, Input } from '@angular/core';
import { PersonService } from '../../../_services/person.service';
import { Observable } from 'rxjs';
// import { PersonAttribute } from '../../../_models/person-attribute';
import { Person } from '../../../_models/person';
import { Router } from '@angular/router';
import { ApplicationError } from 'src/app/_common/application-error';
import { ApplicationConstants } from 'src/app/_common/application-constants';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
})
export class PersonListComponent implements OnInit {
  @Input() public items: Person[] = [];
  @Input() public autoLoad = true;
  @Input() public hideCreate = false;
  public message: string = ApplicationConstants.emptyMessage;

  constructor(private personService: PersonService, private router: Router) {}

  ngOnInit() {
    if (this.autoLoad === true) {
      this.personService.getList().subscribe(
        (data: Person[]) => {
          this.items = data;

          if (data === null || data.length === 0) {
            this.message = ApplicationConstants.noDataMessage;
          } else {
            this.message = ApplicationConstants.emptyMessage;
          }
        },
        (error: ApplicationError) => (this.message = error.friendlyMessage)
      );
    } else {
      this.items = [];
      this.message = ApplicationConstants.emptyMessage;
    }
  }

  rowClicked(event: MouseEvent, item: Person) {
    this.router.navigate(['/person/person-details/' + item.id]);
  }
}
