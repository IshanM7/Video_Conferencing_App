import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { MeetingService } from '../services/meeting.service';

import { Meeting } from '../models/Meeting';
import { User } from '../models/User';

@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.css']
})
export class ScheduleMeetingComponent implements OnInit {
  checked = 0;
  meetings$: Observable<Meeting[]>;
  id: Pick<User,"id">;
  scheduleMeetingForm: FormGroup;

  constructor(private router: Router, private authService: AuthService, private meetingService: MeetingService) { }

  ngOnInit(): void {
    this.meetings$ = this.fetchAll();
    this.id = this.authService.userId;
    this.scheduleMeetingForm = this.createFormGroup();
    console.log(this.id);
  }

  fetchAll(): Observable<Meeting[]> {
    return this.meetingService.getMeetings();
  }

  scheduleMeeting(): void{
    this.meetings$ = this.fetchAll();
    console.log(this.scheduleMeetingForm.value.time);
    console.log(this.scheduleMeetingForm.value.numParticipants);
    if(this.scheduleMeetingForm.value.checked == 1){
      this.scheduleMeetingForm.value.numParticipants = 1000;
    }
    console.log(this.scheduleMeetingForm.value.numParticipants);
    this.meetingService.scheduleMeeting(this.scheduleMeetingForm.value,this.id).subscribe((msg) => console.log(msg));
    console.log(this.scheduleMeetingForm.value);
  }
  deleteMeeting(meetingID: Pick<Meeting,"meetingID">): void{
    this.meetingService.deleteMeeting(meetingID).subscribe(() => (this.meetings$ = this.fetchAll()));

  }
  createFormGroup(): FormGroup{
    return new FormGroup({
      meetingName: new FormControl("",[Validators.required]),
      meetingDescription: new FormControl("",[Validators.required]),
      time: new FormControl("",[Validators.required]),
      numParticipants: new FormControl("",[Validators.required]),
      checked: new FormControl("",[])

    });
  }
}
