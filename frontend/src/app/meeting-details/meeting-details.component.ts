import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingService } from '../services/meeting.service';
import { Meeting } from '../models/Meeting';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { MeetingDetailsDialogComponent } from '../meeting-details-dialog/meeting-details-dialog.component';
import { ScheduleMeetingComponent } from '../schedule-meeting/schedule-meeting.component';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit {
  title = 'appBootstrap';

  closeResult: string;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private meetingService: MeetingService,
    private router: Router,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) { }

  id: number;
  userID: Pick<User,"id">;
  name: Pick<User, "firstName">;
  meetings$: Observable<Meeting[]>;
  user$: Observable<Pick<User,"firstName">>;
  firstName: string;
  ngOnInit(): void {
    this.userID = this.authService.userId;
    this.user$ = this.getName(this.userID);

    console.log(this.firstName);
    this.meetings$ = this.fetchAll();
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if(this.meetings$ == null){
      this.router.navigate(["/dashboard"])
    }
  }
  fetchAll(): Observable<Meeting[]> {
    return this.meetingService.getMeetings();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  openDialog(changeType: string, meetingID: Pick<Meeting,"meetingID">): void {

    if(changeType=='changeName'){
      this.dialog.open(MeetingDetailsDialogComponent, {
        width: '300px',
        data: {type: "name", id: meetingID}
      });
    }
    if(changeType=='changeDescription'){
      this.dialog.open(MeetingDetailsDialogComponent, {
        width: '300px',
        data: {type: "description", id: meetingID}
      });
    }
    if(changeType=='changeParticipation'){
      this.dialog.open(MeetingDetailsDialogComponent, {
        width: '300px',
        data: {type: "participants", id: meetingID}
      });
    }
    if(changeType=='changeTime'){
      this.dialog.open(MeetingDetailsDialogComponent, {
        width: '300px',
        data: {type: "time", id: meetingID}
      });
    }
  }


  getSingleMeeting(id: number): Observable<Meeting>{
    console.log(id);
    return this.meetingService.getSingleMeeting(id);
  }
  startMeeting(id,uuid){
    console.log(id);
    console.log(uuid);
    this.meetingService.getParticipants(id).subscribe((x)=>console.log(x[0][0].currParticipants));
    this.user$.subscribe(val =>{
      const firstName = val[0][0].firstName;
      this.meetingService.startMeeting(id,uuid,this.firstName).subscribe((msg) => console.log(msg));
    })
  }
  getName(id): Observable<Pick<User,"firstName">>{
    return this.authService.getName(id);
  }
}
