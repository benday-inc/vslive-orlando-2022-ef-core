import { Component, OnInit, Input } from '@angular/core';
import { FeedbackService } from '../../../_services/feedback.service';
import { Observable } from 'rxjs';
// import { FeedbackAttribute } from '../../../_models/feedback-attribute';
import { Feedback } from '../../../_models/feedback';
import { Router } from '@angular/router';
import { ApplicationError } from 'src/app/_common/application-error';
import { ApplicationConstants } from 'src/app/_common/application-constants';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css'],
})
export class FeedbackListComponent implements OnInit {
  @Input() public items: Feedback[] = [];
  @Input() public autoLoad = true;
  @Input() public hideCreate = false;
  public message: string = ApplicationConstants.emptyMessage;

  constructor(
    private feedbackService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.autoLoad === true) {
      this.feedbackService.getList().subscribe(
        (data: Feedback[]) => {
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

  rowClicked(event: MouseEvent, item: Feedback) {
    this.router.navigate(['/feedback/feedback-details/' + item.id]);
  }
}
