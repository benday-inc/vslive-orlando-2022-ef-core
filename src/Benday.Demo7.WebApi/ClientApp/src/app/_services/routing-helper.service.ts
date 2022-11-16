import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RoutingHelperService {
  constructor(
    private route: ActivatedRoute | null,
    private router: Router | null,
    private location: Location | null
  ) {}

  getId(): string {
    let returnValue = '';

    if (
      this.route === null ||
      this.route.snapshot === null ||
      this.route.snapshot.paramMap === null
    ) {
      return returnValue;
    } else {
      returnValue = this.route.snapshot.paramMap.get('id') as string;

      if (returnValue !== null) {
        return returnValue;
      } else {
        if (
          this.route.snapshot.firstChild === null ||
          this.route.snapshot.firstChild.paramMap === null
        ) {
          return '';
        } else {
          returnValue = this.route.snapshot.firstChild.paramMap.get(
            'id'
          ) as string;

          if (returnValue !== null) {
            return returnValue;
          } else {
            return '';
          }
        }
      }
    }
  }

  getValue(key: string): string {
    if (!key || key === null) {
      return '';
    } else {
      let returnValue: string;

      returnValue = this.route!.snapshot.queryParamMap.get(key) as string;

      if (returnValue !== null) {
        return returnValue;
      } else {
        if (
          this.route?.snapshot.firstChild === null ||
          this.route?.snapshot.firstChild.paramMap === null
        ) {
          return '';
        } else {
          returnValue = this.route?.snapshot.firstChild.paramMap.get(
            key
          ) as string;

          if (returnValue !== null) {
            return returnValue;
          } else {
            return '';
          }
        }
      }
    }
  }

  back(): void {
    this.location?.back();
  }

  navigateTo(url: string): void {
    this.router?.navigate([url]);
  }
}
