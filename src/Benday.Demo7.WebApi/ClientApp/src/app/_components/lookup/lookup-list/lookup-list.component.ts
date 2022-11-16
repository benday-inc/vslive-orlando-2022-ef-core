import { Component, OnInit, Input } from '@angular/core';
import { LookupService } from '../../../_services/lookup.service';
import { Observable } from 'rxjs';
// import { LookupAttribute } from '../../../_models/lookup-attribute';
import { Lookup } from '../../../_models/lookup';
import { Router } from '@angular/router';
import { ApplicationError } from 'src/app/_common/application-error';
import { ApplicationConstants } from 'src/app/_common/application-constants';

@Component({
  selector: 'app-lookup-list',
  templateUrl: './lookup-list.component.html',
  styleUrls: ['./lookup-list.component.css'],
})
export class LookupListComponent implements OnInit {
  @Input() public items: Lookup[] = [];
  @Input() public autoLoad = true;
  @Input() public hideCreate = false;
  public message: string = ApplicationConstants.emptyMessage;

  constructor(private lookupService: LookupService, private router: Router) {}

  ngOnInit() {
    if (this.autoLoad === true) {
      this.lookupService.getList().subscribe(
        (data: Lookup[]) => {
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

  rowClicked(event: MouseEvent, item: Lookup) {
    this.router.navigate(['/lookup/lookup-details/' + item.id]);
  }
}
