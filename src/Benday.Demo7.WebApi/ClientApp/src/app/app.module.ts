import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LookupDropdownControlComponent } from './_components/lookup-dropdown-control/lookup-dropdown-control.component';

import { ConfigurationItemDetailsComponent } from './_components/configuration-item/configuration-item-details/configuration-item-details.component';
import { ConfigurationItemListComponent } from './_components/configuration-item/configuration-item-list/configuration-item-list.component';
import { ConfigurationItemSearchComponent } from './_components/configuration-item/configuration-item-search/configuration-item-search.component';

import { FeedbackDetailsComponent } from './_components/feedback/feedback-details/feedback-details.component';
import { FeedbackListComponent } from './_components/feedback/feedback-list/feedback-list.component';
import { FeedbackSearchComponent } from './_components/feedback/feedback-search/feedback-search.component';

import { LogEntryDetailsComponent } from './_components/log-entry/log-entry-details/log-entry-details.component';
import { LogEntryListComponent } from './_components/log-entry/log-entry-list/log-entry-list.component';
import { LogEntrySearchComponent } from './_components/log-entry/log-entry-search/log-entry-search.component';

import { LookupDetailsComponent } from './_components/lookup/lookup-details/lookup-details.component';
import { LookupListComponent } from './_components/lookup/lookup-list/lookup-list.component';
import { LookupSearchComponent } from './_components/lookup/lookup-search/lookup-search.component';

import { PersonDetailsComponent } from './_components/person/person-details/person-details.component';
import { PersonDetailsDialogComponent } from './_components/person/person-details-dialog/person-details-dialog.component';
import { PersonListComponent } from './_components/person/person-list/person-list.component';
import { PersonSearchComponent } from './_components/person/person-search/person-search.component';

import { UserDetailsComponent } from './_components/user/user-details/user-details.component';
import { UserListComponent } from './_components/user/user-list/user-list.component';
import { UserSearchComponent } from './_components/user/user-search/user-search.component';

import { UserClaimDetailsComponent } from './_components/user-claim/user-claim-details/user-claim-details.component';
import { UserClaimListComponent } from './_components/user-claim/user-claim-list/user-claim-list.component';
import { UserClaimSearchComponent } from './_components/user-claim/user-claim-search/user-claim-search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LookupDropdownControlComponent,
    ConfigurationItemDetailsComponent,
    ConfigurationItemSearchComponent,
    ConfigurationItemListComponent,

    FeedbackDetailsComponent,
    FeedbackSearchComponent,
    FeedbackListComponent,

    LogEntryDetailsComponent,
    LogEntrySearchComponent,
    LogEntryListComponent,

    LookupDetailsComponent,
    LookupSearchComponent,
    LookupListComponent,

    PersonDetailsComponent,
    PersonDetailsDialogComponent,
    PersonSearchComponent,
    PersonListComponent,

    UserDetailsComponent,
    UserSearchComponent,
    UserListComponent,

    UserClaimDetailsComponent,
    UserClaimSearchComponent,
    UserClaimListComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        { path: '', component: Person, pathMatch: 'full' },
        {
          path: 'configuration-item/configuration-item-list',
          component: ConfigurationItemListComponent,
        },
        {
          path: 'configuration-item/configuration-item-search',
          component: ConfigurationItemSearchComponent,
        },
        {
          path: 'configuration-item/configuration-item-details/:id',
          component: ConfigurationItemDetailsComponent,
        },

        { path: 'feedback/feedback-list', component: FeedbackListComponent },
        {
          path: 'feedback/feedback-search',
          component: FeedbackSearchComponent,
        },
        {
          path: 'feedback/feedback-details/:id',
          component: FeedbackDetailsComponent,
        },

        { path: 'log-entry/log-entry-list', component: LogEntryListComponent },
        {
          path: 'log-entry/log-entry-search',
          component: LogEntrySearchComponent,
        },
        {
          path: 'log-entry/log-entry-details/:id',
          component: LogEntryDetailsComponent,
        },

        { path: 'lookup/lookup-list', component: LookupListComponent },
        { path: 'lookup/lookup-search', component: LookupSearchComponent },
        {
          path: 'lookup/lookup-details/:id',
          component: LookupDetailsComponent,
        },

        { path: 'person/person-list', component: PersonListComponent },
        { path: 'person/person-search', component: PersonSearchComponent },
        {
          path: 'person/person-details/:id',
          component: PersonDetailsComponent,
        },
        {
          path: 'person/person-details-dialog/:id',
          component: PersonDetailsDialogComponent,
        },

        { path: 'user/user-list', component: UserListComponent },
        { path: 'user/user-search', component: UserSearchComponent },
        { path: 'user/user-details/:id', component: UserDetailsComponent },

        {
          path: 'user-claim/user-claim-list',
          component: UserClaimListComponent,
        },
        {
          path: 'user-claim/user-claim-search',
          component: UserClaimSearchComponent,
        },
        {
          path: 'user-claim/user-claim-details/:id',
          component: UserClaimDetailsComponent,
        },
      ],
      { relativeLinkResolution: 'legacy', anchorScrolling: 'enabled' }
    ),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
