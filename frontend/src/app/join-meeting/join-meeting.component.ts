import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { Meeting } from '../models/Meeting';
import { AuthService } from '../services/auth.service';
import { MeetingService } from '../services/meeting.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-join-meeting',
  templateUrl: './join-meeting.component.html',
  styleUrls: ['./join-meeting.component.css']
})
export class JoinMeetingComponent implements OnInit {
  joinMeetingForm: FormGroup;
  id: Pick<User,"id">;
  meetings$: Observable<Meeting>;

  constructor(private meetingService: MeetingService, private router:Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.joinMeetingForm = this.createFormGroup();
    this.id = this.authService.userId;
  }
  createFormGroup(): FormGroup{
    return new FormGroup({

      meetingLink: new FormControl("",[Validators.required]),
    });
  }

  joinMeeting(): void{
    console.log(this.joinMeetingForm.value);
    let uuid = this.joinMeetingForm.value.meetingLink;

    this.meetings$ = this.meetingService.getMeetingFromUUID(uuid);
    this.meetings$.subscribe(val => {
      const meetingId = val[0][0].meetingID;
      const numParticipants = val[0][0].numParticipants;
      const currParticipants = val[0][0].currParticipants;
      if(currParticipants >= numParticipants){
        alert('The meeting is full');
      }
      else{
        const x = val[0];
        if(x[0].started == 0){
          alert('The meeting hasnt started yet, please wait for the host to start');
        }else{
          this.meetingService.joinMeeting(meetingId,uuid).subscribe((msg) => console.log(msg));
          //window.open("http://localhost:5000/meeting/chat/"+uuid+"/?host=false","_blank");
          //this.router.navigate(["/chat/"+uuid]);
        }
      }
    });
  }
}

