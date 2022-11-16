import { Component, OnInit, Input } from '@angular/core';
import { LogEntryService } from '../../../_services/log-entry.service';
import { Observable } from 'rxjs';
// import { LogEntryAttribute } from '../../../_models/log-entry-attribute';
import { LogEntry } from '../../../_models/log-entry';
import { Router } from '@angular/router';
import { ApplicationError } from 'src/app/_common/application-error';
import { ApplicationConstants } from 'src/app/_common/application-constants';

@Component({
  selector: 'app-log-entry-list',
  templateUrl: './log-entry-list.component.html',
  styleUrls: ['./log-entry-list.component.css'],
})
export class LogEntryListComponent implements OnInit {
  @Input() public items: LogEntry[] = [];
  @Input() public autoLoad = true;
  @Input() public hideCreate = false;
  public message: string = ApplicationConstants.emptyMessage;

  constructor(
    private logentryService: LogEntryService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.autoLoad === true) {
      this.logentryService.getList().subscribe(
        (data: LogEntry[]) => {
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

  rowClicked(event: MouseEvent, item: LogEntry) {
    this.router.navigate(['/log-entry/log-entry-details/' + item.id]);
  }
}
