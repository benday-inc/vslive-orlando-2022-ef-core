import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { Observable } from 'rxjs';
// import { UserAttribute } from '../../../_models/user-attribute';
import { User } from '../../../_models/user';
import { Router } from '@angular/router';
import { ApplicationError } from 'src/app/_common/application-error';
import { ApplicationConstants } from 'src/app/_common/application-constants';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @Input() public items: User[] = [];
  @Input() public autoLoad = true;
  @Input() public hideCreate = false;
  public message: string = ApplicationConstants.emptyMessage;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (this.autoLoad === true) {
      this.userService.getList().subscribe(
        (data: User[]) => {
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

  rowClicked(event: MouseEvent, item: User) {
    this.router.navigate(['/user/user-details/' + item.id]);
  }
}
