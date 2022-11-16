import { Component, OnInit, Input } from '@angular/core';
import { ConfigurationItemService } from '../../../_services/configuration-item.service';
import { Observable } from 'rxjs';
// import { ConfigurationItemAttribute } from '../../../_models/configuration-item-attribute';
import { ConfigurationItem } from '../../../_models/configuration-item';
import { Router } from '@angular/router';
import { ApplicationError } from 'src/app/_common/application-error';
import { ApplicationConstants } from 'src/app/_common/application-constants';

@Component({
  selector: 'app-configuration-item-list',
  templateUrl: './configuration-item-list.component.html',
  styleUrls: ['./configuration-item-list.component.css'],
})
export class ConfigurationItemListComponent implements OnInit {
  @Input() public items: ConfigurationItem[] = [];
  @Input() public autoLoad = true;
  @Input() public hideCreate = false;
  public message: string = ApplicationConstants.emptyMessage;

  constructor(
    private configurationitemService: ConfigurationItemService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.autoLoad === true) {
      this.configurationitemService.getList().subscribe(
        (data: ConfigurationItem[]) => {
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

  rowClicked(event: MouseEvent, item: ConfigurationItem) {
    this.router.navigate([
      '/configuration-item/configuration-item-details/' + item.id,
    ]);
  }
}
