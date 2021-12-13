import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Meeting } from '../models/Meeting';
import { User } from '../models/User';
import { MeetingService } from '../services/meeting.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  id: Pick<User,"id">;
  name: Pick<User,"firstName">;
  meetings$: Observable<Meeting[]>;
  delete = 0;
  constructor(private authService: AuthService, private meetingService: MeetingService, private router: Router) { }

  ngOnInit(): void {
    this.meetings$ = this.fetchAll();
    this.id = this.authService.userId;
    this.name = this.authService.userName;

    console.log(this.id);
    console.log(this.name);
  }
  fetchAll(): Observable<Meeting[]> {
    return this.meetingService.getMeetings();
  }
  deleteMeeting(meetingID: Pick<Meeting,"meetingID">): void{
    this.delete= 1;
    this.meetingService.deleteMeeting(meetingID).subscribe(() => (this.meetings$ = this.fetchAll()));
    alert("Meeting deleted");
    this.router.navigate(["/dashboard"]);

  }
  meetingDetails(id){
    if(this.delete!=1){

      this.router.navigate(["/meeting-details/"+id]);
    }
    if(this.delete == 1){
      this.delete = 0;
    }
  }

}
