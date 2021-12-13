import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JoinMeetingComponent } from './join-meeting/join-meeting.component';
import { SignupComponent } from './signup/signup.component';

import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { MeetingDetailsDialogComponent } from './meeting-details-dialog/meeting-details-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScheduleMeetingComponent,
    DashboardComponent,
    JoinMeetingComponent,
    SignupComponent,
    MeetingDetailsComponent,
    MeetingDetailsDialogComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatGridListModule,
    FormsModule,
    ClipboardModule,
    NgbModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [
    ],
  bootstrap: [AppComponent],
  entryComponents: [MeetingDetailsDialogComponent]
})
export class AppModule { }
