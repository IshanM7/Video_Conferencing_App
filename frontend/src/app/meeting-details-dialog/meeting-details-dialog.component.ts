import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../models/User';
import { MeetingService } from '../services/meeting.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-meeting-details-dialog',
  templateUrl: './meeting-details-dialog.component.html',
  styleUrls: ['./meeting-details-dialog.component.css']
})
export class MeetingDetailsDialogComponent implements OnInit {
  changeNameForm: FormGroup;
  changeDescriptionForm: FormGroup;
  changeParticipationForm: FormGroup;
  changeTimeForm: FormGroup;
  userID: Pick<User,"id">;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService,private meetingService: MeetingService) { }

  ngOnInit(): void {
    this.userID = this.authService.userId;
    this.changeNameForm = this.createNameFormGroup();
    this.changeDescriptionForm = this.createDescFormGroup();
    this.changeParticipationForm = this.createParticipationGroup();
    this.changeTimeForm = this.createTimeFormGroup();
  }
  createNameFormGroup(): FormGroup{
    return new FormGroup({
      meetingName: new FormControl("",[Validators.required]),
    });
  }
  createDescFormGroup(): FormGroup{
    return new FormGroup({
      meetingDescription: new FormControl("",[Validators.required]),
    });
  }
  createParticipationGroup(): FormGroup{
    return new FormGroup({
      numParticipants: new FormControl("",[Validators.required]),
    });
  }
  createTimeFormGroup(): FormGroup{
    return new FormGroup({
      time: new FormControl("",[Validators.required]),
    });
  }
  submitName(){
    console.log(this.changeNameForm.value);
    this.meetingService.changeMeetingName(this.changeNameForm.value,this.data.id).subscribe((msg) => console.log(msg));

  }
  submitDescription(){
    console.log(this.changeDescriptionForm.value);
    this.meetingService.changeMeetingDescription(this.changeDescriptionForm.value,this.data.id).subscribe((msg) => console.log(msg));
  }
  submitParticipation(){
    console.log(this.changeParticipationForm.value);
    console.log(this.data.id);
    this.meetingService.changeMeetingParticipation(this.changeParticipationForm.value,this.data.id).subscribe((msg) => console.log(msg));
  }
  submitTime(){
    this.meetingService.changeMeetingTime(this.changeTimeForm.value,this.data.id).subscribe((msg) => console.log(msg));
  }
}
