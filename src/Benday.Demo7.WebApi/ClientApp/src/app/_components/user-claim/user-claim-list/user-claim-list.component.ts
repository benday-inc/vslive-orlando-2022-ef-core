import { Component, OnInit, Input } from '@angular/core';
import { UserClaimService } from '../../../_services/user-claim.service';
import { Observable } from 'rxjs';
// import { UserClaimAttribute } from '../../../_models/user-claim-attribute';
import { UserClaim } from '../../../_models/user-claim';
import { Router } from '@angular/router';
import { ApplicationError } from 'src/app/_common/application-error';
import { ApplicationConstants } from 'src/app/_common/application-constants';

@Component({
  selector: 'app-user-claim-list',
  templateUrl: './user-claim-list.component.html',
  styleUrls: ['./user-claim-list.component.css'],
})
export class UserClaimListComponent implements OnInit {
  @Input() public items: UserClaim[] = [];
  @Input() public autoLoad = true;
  @Input() public hideCreate = false;
  @Input() public parentId = -1;
  public message: string = ApplicationConstants.emptyMessage;

  constructor(
    private userclaimService: UserClaimService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.autoLoad === true) {
      this.userclaimService.getList().subscribe(
        (data: UserClaim[]) => {
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

  rowClicked(event: MouseEvent, item: UserClaim) {
    this.router.navigate(['/user-claim/user-claim-details/' + item.id]);
  }
}
