import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { JoinMeetingComponent } from './join-meeting/join-meeting.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "schedule-meeting",
    component: ScheduleMeetingComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "join-meeting",
    component: JoinMeetingComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "meeting-details/:id",
    component: MeetingDetailsComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
